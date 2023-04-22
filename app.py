from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import psycopg2
from apscheduler.schedulers.background import BackgroundScheduler
from flask_mail import Mail, Message
import schedule
from time import sleep
import threading
app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})


app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = ''
app.config['MAIL_PASSWORD'] = ''
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_DEFAULT_SENDER'] = ''
mail = Mail(app)


conn = psycopg2.connect(
    host="satao.db.elephantsql.com",
    database="caxbuqxg",
    user="caxbuqxg",
    password="DCsl9RpdWlopRIOBbOU8a_SHm7xoyx1k",
    sslmode="require"
)

cur = conn.cursor()

# create users table if not exists
cur.execute("""
    CREATE TABLE IF NOT EXISTS users_db1 (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    );
""")


cur.execute(
    "CREATE TABLE IF NOT EXISTS subscribers_db (id SERIAL PRIMARY KEY, email TEXT NOT NULL)")

# close the cursor and connection
cur.close()


@app.route("/")
def index():
    return "Homepage of GeeksForGeeks"


@app.route('/api/signup', methods=['POST'])
@cross_origin()
def signup():
    email = request.json.get('email')
    password = request.json.get('password')

    cur = conn.cursor()

    cur.execute("""
            INSERT INTO users_db1 (email, password)
            VALUES (%s, %s)
            RETURNING id;
        """, (email, password))

    conn.commit()
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        return jsonify({'message': 'Signup successful!'})
    else:
        return "Content type is not supported."


@app.route('/api/login', methods=['POST'])
@cross_origin()
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']
    cur = conn.cursor()
    cur.execute(
        "SELECT * FROM users WHERE email = %s AND password = %s", (email, password))
    user = cur.fetchone()
    cur.close()
    if user:
        return jsonify({'success': True, 'user': {'id': user[0], 'email': user[1]}})
    else:
        return jsonify({'success': False, 'message': 'Invalid credentials'})


@app.route('/api/subscribe', methods=['POST'])
@cross_origin()
def subscribe():
    email = request.json.get('email')
    cur = conn.cursor()

    cur.execute("SELECT id FROM subscribers_db WHERE email = %s", (email,))
    existing_subscriber = cur.fetchone()
    if existing_subscriber:
        return jsonify({'message': 'Email already subscribed'}), 400

    cur.execute("""
        INSERT INTO subscribers_db (email)
        VALUES (%s)
        RETURNING id;
    """, (email,))

    conn.commit()
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        return jsonify({'message': 'Subscribe successful!', 'success': True})
    else:
        return "Content type is not supported."


def get_all_subscribers():
    cur = conn.cursor()
    cur.execute("SELECT * FROM subscribers_db")
    rows = cur.fetchall()
    cur.close()
    return rows


@app.route('/api/subscribers', methods=['GET'])
def subscribers():
    subscribers = get_all_subscribers()
    response = {'subscribers': subscribers}
    return jsonify(response)


def send_email(subject, body):
    with app.app_context():
        subscribers = get_all_subscribers()
        for subscriber in subscribers:
            try:
                msg = Message(subject=subject, recipients=[subscriber[1]])
                msg.body = body
                mail.send(msg)
                print(msg,"hey")
            except:
                continue


def send_emails(subject, body, time):
    schedule.every().day.at(time).do(send_email, subject, body)
    while True:
        schedule.run_pending()
        sleep(1)


@app.route('/api/send-mail', methods=['POST'])
@cross_origin()
def send_mail():
    subject = request.json['subject']
    body = request.json['body']
    time = request.json['time']
    email_thread = threading.Thread(
        target=send_emails, args=(subject, body, time))
    email_thread.start()

    return jsonify({'message': 'Messages queued sucessfully'})


if __name__ == "__main__":
    app.run(debug=True)
