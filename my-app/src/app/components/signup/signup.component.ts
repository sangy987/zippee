import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  constructor(private http: HttpClient) {}

  onSubmit() {
    const data = {
      email: this.email,
      password: this.password,
    };

    this.http.post('http://localhost:5000/api/signup', data).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => console.log(error)
    );
  }
}
