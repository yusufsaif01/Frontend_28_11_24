import { Component, OnInit } from '@angular/core';
declare let gtag: Function;
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  constructor() {}
  trackButtonClick() {
    gtag('event', 'contact_us_button_click', {
      event_category: 'Button',
      event_label: 'Contact Us Button',
      value: 1
    });
  }
  ngOnInit(): void {}
}
