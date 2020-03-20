import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-frontend',
  templateUrl: './frontend.component.html',
  styleUrls: ['./frontend.component.scss']
})
export class FrontendComponent implements OnInit, OnDestroy {
  constructor(private renderer: Renderer2) {
    this.renderer.addClass(document.body.parentElement, 'layout-1440');
  }
  ngOnInit() {}
  ngOnDestroy() {
    this.renderer.removeClass(document.body.parentElement, 'layout-1440');
  }
}
