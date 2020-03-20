import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-login-frontend',
  templateUrl: './login-frontend.component.html',
  styleUrls: ['./login-frontend.component.scss']
})
export class LoginFrontendComponent implements OnInit {
  constructor(private renderer: Renderer2) {
    this.renderer.addClass(document.body.parentElement, 'layout-1440');
  }
  ngOnInit() {}
  ngOnDestroy() {
    this.renderer.removeClass(document.body.parentElement, 'layout-1440');
  }
}
