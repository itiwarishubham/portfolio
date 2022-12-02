import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  messageForm:FormGroup = new FormGroup({
    fullname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required, Validators.email])
  });
  success:boolean = false;
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.messageForm.value);
    this.httpClient.post("https://itiwarishubham-ef4dd-default-rtdb.asia-southeast1.firebasedatabase.app/messages.json", this.messageForm.value)
      .subscribe(
        (response: any) => {
          console.log(response);
          this.success = true;
          this.messageForm.reset();
        },
        (error: any)=>{
          console.error(error);
        }
      );
  }

}
