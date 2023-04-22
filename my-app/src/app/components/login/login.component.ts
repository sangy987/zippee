import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

interface Response {
  message: string;
  success: boolean;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isSignedUp = true;
  constructor(private http: HttpClient) {}

  onSubmit() {
    const data = {
      email: this.email,
      password: this.password
    };

    this.http.post<Response>('http://localhost:5000/api/login', data).subscribe(
      (response) => {
        if (response.success == false){
          this.isSignedUp = false;
        }

      }
      ,
      error => console.log(error)
    );
  }
}
