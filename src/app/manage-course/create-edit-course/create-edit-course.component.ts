import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
export interface Crediential {
  name: string;
  type: string;
}
@Component({
  selector: 'app-create-edit-course',
  templateUrl: './create-edit-course.component.html',
  styleUrls: ['./create-edit-course.component.scss']
})
export class CreateEditCourseComponent implements OnInit {
  displayedColumns: string[] = ['name', 'type', 'select'];
  dataSource = new MatTableDataSource<Crediential>([
    {
      name: 'string',
      type: 'Badges'
    },
    {
      name: 'string',
      type: 'Certificate'
    }
  ]);
  constructor() {}

  ngOnInit() {}
}
