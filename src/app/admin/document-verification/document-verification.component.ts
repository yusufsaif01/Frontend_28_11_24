import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DocumentVerificationTableConfig } from './document-verification-table-conf';

@Component({
  selector: 'app-document-verification',
  templateUrl: './document-verification.component.html',
  styleUrls: ['./document-verification.component.scss']
})
export class DocumentVerificationComponent implements OnInit {
  public sideBarToggle: boolean = true;
  public tableConfig: DocumentVerificationTableConfig = new DocumentVerificationTableConfig();
  public dataSource = new MatTableDataSource([]);
  constructor() {}

  updateSidebar($event: any) {
    this.sideBarToggle = $event;
  }

  ngOnInit() {}
}
