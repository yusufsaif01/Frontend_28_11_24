import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  activeForm: string = 'player';
  constructor() {}

  ngOnInit() {}

  toggleForm(formName: string) {
    this.activeForm = formName;
  }
}
