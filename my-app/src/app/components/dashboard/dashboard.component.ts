import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataAnalyticsService } from 'src/app/services/data-analytics.service';
import { interval } from 'rxjs';

interface Response {
  message: string;
}

export interface Data {
  data: [number, string, string, string][];
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
  data: any[] = [];
  showAlert: boolean = true;
  settings = {
    columns: {
      email: {
        title: 'Email',
      },
      status: {
        title: 'Status',
      },
      time: {
        title: 'TimeStamp',
      },
    },
    actions: {
      add: false, 
      edit: false, 
      delete: false, 
    },
    pager: {
      display: true,
      perPage: 5,
    },
  };
  constructor(
    private router: Router,
    private http: HttpClient,
    private dataService: DataAnalyticsService
  ) {}

  ngOnInit() {
    this.getData();
    interval(60000).subscribe(() => this.getData());
  }

  getData() {
    this.dataService.getData().subscribe((data) => {
      this.data = data;
    });
  }
  logout() {
    this.router.navigate(['']);
  }

  sendMail() {
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
          this.message = response.message;
          this.subscriptionSuccess = true;
          this.subject = '';
          this.body = '';
          setTimeout(() => {
            this.subscriptionSuccess = false;
          }, 5000);
        },
        (error) => {
          console.log(error);
        }
      );
  }
  onClose(){
    setTimeout(() => this.showAlert = false, 1000);
  }
}
