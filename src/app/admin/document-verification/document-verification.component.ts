import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-verification',
  templateUrl: './document-verification.component.html',
  styleUrls: ['./document-verification.component.scss']
})
export class DocumentVerificationComponent implements OnInit {
  public sideBarToggle: boolean = true;
  constructor() {}

  updateSidebar($event: any) {
    this.sideBarToggle = $event;
  }

  ngOnInit() {}
}
