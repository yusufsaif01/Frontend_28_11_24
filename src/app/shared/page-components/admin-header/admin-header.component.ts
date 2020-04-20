import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
  public isActive: boolean = true;
  @Input() toggler: boolean = true;
  @Output() toggleChange = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private _authenticationService: AuthenticationService
  ) {}

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

  logout() {
    this._authenticationService.logout();
  }
}
