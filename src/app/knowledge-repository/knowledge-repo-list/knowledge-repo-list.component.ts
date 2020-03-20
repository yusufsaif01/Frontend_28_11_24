import { element } from 'protractor';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { KnowledgeRepositoryService } from '../knowledge-repository.service';

export interface Content {
  position: string;
  content: string;
  department: string;
}
const Element_data: Content[] = [{ position: '1', content: 'test', department: 'test' }];

@Component({
  selector: 'app-knowledge-repo-list',
  templateUrl: './knowledge-repo-list.component.html',
  styleUrls: ['./knowledge-repo-list.component.scss']
})
export class KnowledgeRepoListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'content', 'department', 'action'];
  dataSource = new MatTableDataSource([]);
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private knowledgeRepoService: KnowledgeRepositoryService
  ) {}

  ngOnInit() {
    this.knowledgeRepoService.getContentListing().subscribe((res: any) => {
      console.log('data records', res.data.records);
      this.dataSource = new MatTableDataSource(res.data.records);
    });
  }
  onAddContent() {
    this.router.navigate(['../add'], { relativeTo: this.activatedRoute });
  }
  onEditContent(element: any) {
    console.log(element);
    this.router.navigateByUrl(`/knowledge-repo/edit?id=${element.id}`);
  }
}
