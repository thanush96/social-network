import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  constructor(public userService: UserService, public router: Router) {}

  ngOnInit(): void {
    if (this.userService.user == undefined || this.userService.user == null) {
      this.router.navigate(['/login']);
    }
  }
}
