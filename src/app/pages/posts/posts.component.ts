import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { PostService } from 'src/app/service/post.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  constructor(
    public userService: UserService,
    private router: Router,
    public storage: AngularFireStorage,
    public postService: PostService,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (this.userService.user == undefined || this.userService.user == null) {
      let user = localStorage.getItem('user');
      if (user != null) {
        this.userService.user = JSON.parse(user);
      } else {
        this.router.navigate(['/login']);
      }
    }

    // get all posts
    this.postService
      .getAllPosts()
      .then((res: any) => {
        this.posts = res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  selectedFile: any;
  text: string = '';
  posts: Array<any> = [];
  comment: Array<any> = [];

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  like(postId: any) {
    for (let i = 0; i < this.posts.length; i++) {
      if (this.posts[i].id == postId) {
        if (this.posts[i].likes.indexOf(this.userService.user.id) >= 0) {
          this.posts[i].likes.splice(
            this.posts[i].likes.indexOf(this.userService.user.id),
            1
          );
        } else {
          this.posts[i].likes.push(this.userService.user.id);
        }

        this.postService
          .updateLikes(this.posts[i])
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }

  comments(postId: any, commentIndex: any) {
    for (let i = 0; i < this.posts.length; i++) {
      if (this.posts[i].id == postId) {
        let commentObj = {
          username: this.userService.user.userName,
          comment: this.comment[commentIndex],
        };

        this.posts[i].comment.push(commentObj);
        this.comment[commentIndex] = '';
        this.postService.updateComments(this.posts[i]);
      }
    }
  }

  post() {
    this.matSnackBar.open('Creating new post...', '', { duration: 15000 });
    if (this.selectedFile != undefined || this.selectedFile != null) {
      this.uploadImage()
        .then((imageURL) => {
          let postObj = {
            userName: this.userService.user.userName,
            imageURL: imageURL,
            text: this.text,
            likes: [],
            comment: [{ userName: '', comment: '' }],
          };

          this.posts.push(postObj);
          this.postService
            .saveNewPost(postObj)
            .then((res) => {
              console.log(res);
              this.matSnackBar.open('Posted successfully', 'OK');
            })
            .catch((err) => {
              console.log(err);
            });
          this.selectedFile = undefined;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      let postObj = {
        userName: this.userService.user.userName,
        imageURL: '',
        text: this.text,
        likes: [],
        comment: [{ userName: '', comment: '' }],
      };

      this.posts.push(postObj);
      this.postService.saveNewPost(postObj);
      this.matSnackBar.open('Posted successfully', 'OK');
    }
  }

  uploadImage() {
    return new Promise((resolve, reject) => {
      let n = Date.now();
      const file = this.selectedFile;
      const filePath = `images/${n}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);

      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            let imageUrl = fileRef.getDownloadURL();

            imageUrl.subscribe((url: any) => {
              if (url) {
                console.log(url);
                resolve(url);
              }
            });
          })
        )
        .subscribe((url) => {
          if (url) {
            console.log('subscribe', url);
          }
        });
    });
  }

  postSchema = {
    userName: '',
    imageURL: '',
    text: '',
    likes: [],
    comment: [{ userName: '', comment: '' }],
  };
}
