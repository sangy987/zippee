import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  errorMessageFlag: boolean = false;
  constructor(private http: HttpClient,private router: Router) {}

  onSubmit() {
    const data = {
      email: this.email,
      password: this.password,
    };

    this.http.post('http://localhost:5000/api/signup', data).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.errorMessage = error.error.message;
        this.errorMessageFlag = true;
      }
    );
  }
}
