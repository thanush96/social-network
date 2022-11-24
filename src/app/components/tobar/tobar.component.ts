import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-tobar',
  templateUrl: './tobar.component.html',
  styleUrls: ['./tobar.component.css'],
})
export class TobarComponent implements OnInit {
  constructor(
    public userService: UserService,
    public router: Router,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  logout() {
    this.userService.user = undefined;
    this.snackBar.open('logout successful', 'ok');
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
