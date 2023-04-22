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
    this.router.navigate(['/login']);
  }

  sendMail() {
    console.log(this.body, this.subject, this.time);
    const mailData = {
      subject: this.subject,
      body: this.body,
      time: this.time,
    };
    this.http
      .post<Response>('http://localhost:5000/api/send-mail', mailData)
      .subscribe(
        (response) => {
          this.message = response.message;
          this.subscriptionSuccess = true;
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
