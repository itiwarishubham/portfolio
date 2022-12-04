import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Post } from '../entity/post';

@Injectable({
  providedIn: 'root'
})
export class PostserviceService {
  list!: AngularFireList<any>;
  postRef!: AngularFireList<any>;    // Reference to Student data list, its an Observable
  constructor(private db: AngularFireDatabase) { }

  // Create Post
  AddPost(post: Post) {
    this.db.database.ref('posts').push(post);
  }

  // Fetch Posts List
  GetPostsList() {
    this.postRef = this.db.list('posts');
    return this.postRef;
  } 
}
