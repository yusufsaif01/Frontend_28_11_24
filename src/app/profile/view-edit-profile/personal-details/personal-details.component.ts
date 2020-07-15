import { Component, OnInit } from '@angular/core';
import { ViewEditProfileService } from '../view-edit-profile.service';
import { ToastrService } from 'ngx-toastr';
import { untilDestroyed } from '@app/core';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {
  positionArray: any[] = [];
  constructor(
    private _editProfileService: ViewEditProfileService,
    private _toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.getPositionList();
  }
  getPositionList() {
    this._editProfileService
      .getPositionList()
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this.positionArray = response.data.records;
        },
        error => {
          this._toastrService.error(error.error.message, 'Error');
        }
      );
  }

  ngOnDestroy() {}
}
