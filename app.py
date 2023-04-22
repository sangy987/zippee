from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import psycopg2
from apscheduler.schedulers.background import BackgroundScheduler

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})# Pass the required route to the decorator.


# def send_morning_message():
#     with app.app_context():
#         # Query the database to get all users
#         users = User.query.all()
        
#         # Create the message to send
#         message = Message('Good morning!', recipients=[user.email for user in users])
#         message.body = f"Hello, it's {datetime.now().strftime('%H:%M:%S')}! Have a great day."
        
#         try:
#             # Send the message
#             mail.send(message)
#             print("Morning message sent successfully!")
#         except Exception as e:
#             print(f"Failed to send morning message: {e}")

app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = '<your-gmail-username>'
app.config['MAIL_PASSWORD'] = '<your-gmail-password>'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_DEFAULT_SENDER'] = '<your-email-address>'


# scheduler = BackgroundScheduler()
# scheduler.add_job(send_morning_message, 'cron', hour=6, minute=0)
# scheduler.start()
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



cur.execute("CREATE TABLE IF NOT EXISTS subscribers_db (id SERIAL PRIMARY KEY, email TEXT NOT NULL)")

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
    cur.execute("SELECT * FROM users WHERE email = %s AND password = %s", (email, password))
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
    
if __name__ == "__main__":
    app.run(debug=True)
