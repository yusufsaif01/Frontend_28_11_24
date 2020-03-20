import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
export interface Course {
  position: string;
  name: string;
  department: string;
  assigned_chapter: string;
}
@Component({
  selector: 'app-course-listing',
  templateUrl: './course-listing.component.html',
  styleUrls: ['./course-listing.component.scss']
})
export class CourseListingComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'department', 'assigned_chapter', 'action'];
  dataSource = new MatTableDataSource<Course>([
    {
      position: 'string',
      name: 'string',
      department: 'string',
      assigned_chapter: '05'
    },
    {
      position: 'string',
      name: 'string',
      department: 'string',
      assigned_chapter: '05'
    },
    {
      position: 'string',
      name: 'string',
      department: 'string',
      assigned_chapter: '05'
    }
  ]);
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}
  onCreateCourse() {
    this.router.navigate(['../create'], { relativeTo: this.activatedRoute });
  }
  ngOnInit() {}
  applyFilter(value: any) {
    console.log(value);
  }
  onCreateModule() {}
}
