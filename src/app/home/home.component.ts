import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare let gtag: Function;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('footballers', { static: true }) footballers: ElementRef;
  @ViewChild('arrow', { static: true }) arrow: ElementRef;

  constructor() {}

  ngOnInit() {}
  trackJoinButtonClick() {
    gtag('event', 'join_button_click', {
      event_category: 'Button',
      event_label: 'join Button',
      value: 1
    });
  }
  trackAppDownloadButtonClick() {
    gtag('event', 'apk_button_click', {
      event_category: 'Button',
      event_label: 'Apk Download Button',
      value: 1
    });
  }
  public scrollToFootballers() {
    this.arrow.nativeElement.classList.remove('bounce');
    this.footballers.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
  }
}
