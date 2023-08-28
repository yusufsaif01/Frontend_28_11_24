import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

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

  public scrollToFootballers() {
    this.arrow.nativeElement.classList.remove('bounce');
    this.footballers.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
  }
}
