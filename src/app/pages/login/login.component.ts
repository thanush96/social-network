import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    let user = localStorage.getItem('user');
    if (user != null) {
      this.userService.user = JSON.parse(user);
      this.router.navigate(['/posts']);
    }
  }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  login() {
    this.userService
      .getUser(this.loginForm.value.email)
      .then((res: any) => {
        if (res.length == 0) {
          this.snackBar.open('Account does not exist', 'ok');
        } else {
          if (res[0].password === this.loginForm.value.password) {
            this.userService.user = res[0];
            localStorage.setItem('user', JSON.stringify(res[0]));
            this.snackBar.open('Login successful', 'ok');
            this.router.navigate(['/posts']);
          } else {
            this.snackBar.open('Incorrect password', 'ok');
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
