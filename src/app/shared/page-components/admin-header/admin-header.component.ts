import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
  public isActive: boolean = true;
  @Input() toggler: boolean = true;
  @Output() toggleChange = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {}

  toggleSidebar() {
    if (this.toggler) this.toggler = false;
    else this.toggler = true;
    this.toggleChange.emit(this.toggler);
  }

  changeDropdown() {
    if (this.isActive) {
      this.isActive = false;
    } else {
      this.isActive = true;
    }
  }
}
