import { Component, OnInit } from '@angular/core';
import { AuthenticationService, untilDestroyed } from '@app/core';
@Component({
  selector: 'app-account-delete',
  templateUrl: './account-delete.component.html',
  styleUrls: ['./account-delete.component.scss']
})
export class AccountDeleteComponent implements OnInit {
  constructor(private _authenticationService: AuthenticationService) {}

  ngOnInit() {}
  accountDelete() {
    const user_id = localStorage.getItem('user_id');
    console.log('account delete function in component');
    this._authenticationService
      .accountDelete(user_id)
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          console.log('delete');
        },
        error => {
          console.log('not deleted');
        }
      );
  }
}
