import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
export interface Chapter {
  chapter_name: string;
  course_type: string;
}
@Component({
  selector: 'app-select-chapter',
  templateUrl: './select-chapter.component.html',
  styleUrls: ['./select-chapter.component.scss']
})
export class SelectChapterComponent implements OnInit {
  displayedColumns: string[] = ['position', 'course_type', 'chapter_name', 'select'];
  dataSource = new MatTableDataSource<Chapter>([
    { course_type: 'Lorem Ipsum is simply dummy text', chapter_name: '01' },
    { course_type: 'Lorem Ipsum is simply dummy text', chapter_name: '02' },
    { course_type: 'Lorem Ipsum is simply dummy text', chapter_name: '03' },
    { course_type: 'Lorem Ipsum is simply dummy text', chapter_name: '04' },
    { course_type: 'Lorem Ipsum is simply dummy text', chapter_name: '05' },
    { course_type: 'Lorem Ipsum is simply dummy text', chapter_name: '06' },
    { course_type: 'Lorem Ipsum is simply dummy text', chapter_name: '07' },
    { course_type: 'Lorem Ipsum is simply dummy text', chapter_name: '08' }
  ]);
  constructor() {}

  ngOnInit() {}
}
