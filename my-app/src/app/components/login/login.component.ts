import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { response } from 'express';

interface Response {
  message: string;
  success: boolean;
  error: Error;
}
interface Error {
  message: string;
  success: boolean;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isSignedUp = false;
  message: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const data = {
      email: this.email,
      password: this.password,
    };

    this.http.post<Response>('http://localhost:5000/api/login', data).subscribe(
      (response) => {
        {
          if (response.success == true) {
            this.router.navigate(['/dashboard']);
          }
        }
        if (response.success == false) {
          this.isSignedUp = true;
          this.message = response.message;
        }
      },
      (error) => {}
    );
  }
}
