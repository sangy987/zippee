import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
interface Response {
  message: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  subject: string = '';
  body: string = '';
  time: string = '';
  message: string = '';
  subscriptionSuccess: boolean = false;

  constructor(private router: Router, private http: HttpClient) {}

  logout() {
    this.router.navigate(['']);
  }

  sendMail() {
    console.log(this.body, this.subject, this.time);
    const date = new Date(this.time);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const times = hours + ':' + minutes;
    console.log(times); 
    const mailData = {
      subject: this.subject,
      body: this.body,
      time: times,
    };
    this.http
      .post<Response>('http://localhost:5000/api/send-mail', mailData)
      .subscribe(
        (response) => {
          console.log("rrr",response);
          this.message = response.message;
          this.subscriptionSuccess = true;
          setTimeout(() => {
            this.subscriptionSuccess = false;
          }, 5000);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
