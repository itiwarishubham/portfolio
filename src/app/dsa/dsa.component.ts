import { Component, OnInit } from '@angular/core';
import questionJson from '../../assets/json/blind75.json';
import { Question } from '../entity/question';

@Component({
  selector: 'app-dsa',
  templateUrl: './dsa.component.html',
  styleUrls: ['./dsa.component.scss']
})
export class DsaComponent implements OnInit {

  questions: Question[] = questionJson.questions;
  constructor() { }

  ngOnInit(): void {
  }

  readJson():any{
    questionJson.questions.forEach(e => {
      console.log(e.name)
    })
    console.log(questionJson.questions);
  }

}
