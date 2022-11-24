import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getAllPosts() {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/post').subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  saveNewPost(postObj: any) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/post', postObj).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  updateLikes(postObj: any) {
    return new Promise((resolve, reject) => {
      this.http
        .put('http://localhost:3000/post/' + postObj.id, postObj)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  updateComments(postObj: any) {
    return new Promise((resolve, reject) => {
      this.http
        .put('http://localhost:3000/post/' + postObj.id, postObj)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }
}
