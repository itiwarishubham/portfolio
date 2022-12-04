import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostserviceService } from '../service/postservice.service';
import { Post } from '../entity/post';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  content: string = ''
  postForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    tag: new FormControl('', [Validators.email]),
    content: new FormControl('', [Validators.required, Validators.required])
  });
  posts!: Post[];
  constructor(private httpClient: HttpClient, private postservice: PostserviceService) { }

  ngOnInit(): void {
    this.postservice.GetPostsList().valueChanges().subscribe(data => {
      this.posts = data;
    })
  }

  onSubmit() {
    const post: Post = this.postForm.value;
    this.postservice.AddPost(post);
    this.postForm.reset();
    this.hideModel()
  }
  fillModal(event: string) {
    this.content = event
  }
  @ViewChild('exampleModal') private closeModal!: ElementRef;
  public hideModel() {
    this.closeModal.nativeElement.click();
  }
}
