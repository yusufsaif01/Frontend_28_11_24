import { Component, OnInit } from '@angular/core';

declare var adsbygoogle: any;

@Component({
  selector: 'app-ad-banner',
  templateUrl: './ad-banner.component.html',
  styleUrls: ['./ad-banner.component.css']
})
export class AdBannerComponent implements OnInit {
  ngOnInit() {
    if (typeof adsbygoogle !== 'undefined') {
      adsbygoogle.push({});
    }
  }
}
