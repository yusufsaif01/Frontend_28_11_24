import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isActive: boolean = true;
  public avatar_url: string = localStorage.getItem('avatar_url');
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  Logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
  changeDropdown() {
    console.log('fgd');
    if (this.isActive) {
      this.isActive = false;
    } else {
      this.isActive = true;
    }
  }
}
