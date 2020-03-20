import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
export interface Question {
  position: string;
  question: string;
}

const Question_DATA: Question[] = [
  { position: '01', question: 'Lorem Ipsum is simply dummy text Lorem Ipsum is simply dummy text' },
  { position: '02', question: 'Lorem Ipsum is simply dummy text Lorem Ipsum is simply dummy text' },
  { position: '03', question: 'Lorem Ipsum is simply dummy text Lorem Ipsum is simply dummy text' },
  { position: '04', question: 'Lorem Ipsum is simply dummy text Lorem Ipsum is simply dummy text' },
  { position: '05', question: 'Lorem Ipsum is simply dummy text Lorem Ipsum is simply dummy text' },
  { position: '06', question: 'Lorem Ipsum is simply dummy text Lorem Ipsum is simply dummy text' },
  { position: '07', question: 'Lorem Ipsum is simply dummy text Lorem Ipsum is simply dummy text' },
  { position: '08', question: 'Lorem Ipsum is simply dummy text Lorem Ipsum is simply dummy text' }
];
@Component({
  selector: 'app-question-content-list',
  templateUrl: './question-content-list.component.html',
  styleUrls: ['./question-content-list.component.scss']
})
export class QuestionContentListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'question', 'action'];
  dataSource = Question_DATA;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {}
  onAddQuestion() {
    this.router.navigate(['../create'], { relativeTo: this.activatedRoute });
  }
}
