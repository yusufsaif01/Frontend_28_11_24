import { Component, OnInit, OnDestroy } from '@angular/core';
import { DeleteConfirmationComponent } from '@app/shared/dialog-box/delete-confirmation/delete-confirmation.component';
import { AccountDeleteService } from './account-delete.service';
import { ToastrService } from 'ngx-toastr';
import { untilDestroyed } from '@app/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-delete',
  templateUrl: './account-delete.component.html',
  styleUrls: ['./account-delete.component.scss']
})
export class AccountDeleteComponent implements OnInit, OnDestroy {
  constructor(
    public dialog: MatDialog,
    private _editProfileService: AccountDeleteService,
    private router: Router,
    private route: ActivatedRoute,
    private _toastrService: ToastrService
  ) {}

  ngOnInit() {}
  ngOnDestroy() {}
  deleteAccount() {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      panelClass: 'deletepopup',
      data: {
        message: 'Are you sure you want to delete Your Account?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        const user_id = localStorage.getItem('user_id');
        this._editProfileService
          .deleteAccount(user_id)
          .pipe(untilDestroyed(this))
          .subscribe(
            response => {
              this._toastrService.success(
                `Success`,
                'Account deleted successfully'
              );
              this.router.navigate(
                [this.route.snapshot.queryParams.redirect || '/login'],
                { replaceUrl: true }
              );
            },
            error => {
              this._toastrService.error(
                `${error.error.message}`,
                'Delete Account'
              );
            }
          );
      }
    });
  }
}
