import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

interface Data {
  message: string;
  success: boolean;
}

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss'],
})
export class SubscribeComponent {
  email: string = '';
  subscriptionSuccess = false;
  errorMessage: string = '';
  errorMessageFlag: boolean = false;

  constructor(private http: HttpClient) {}
  onSubmit() {
    const data = {
      email: this.email,
    };

    this.http.post<Data>('http://localhost:5000/api/subscribe', data).subscribe(
      (response) => {
        this.subscriptionSuccess = response.success;
        this.email = '';
      },
      (error) => {
        this.errorMessage = error.error.message;
        this.errorMessageFlag = true;
      }
    );
  }
}
