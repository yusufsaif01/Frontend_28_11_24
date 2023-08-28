import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-back-navigation',
  templateUrl: './back-navigation.component.html',
  styleUrls: ['./back-navigation.component.scss']
})
export class BackNavigationComponent implements OnInit {
  constructor(private _location: Location) {}

  ngOnInit() {}

  navigateBack() {
    this._location.back();
  }
}
