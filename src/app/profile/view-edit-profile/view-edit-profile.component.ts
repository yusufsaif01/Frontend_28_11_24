import { Component, OnInit } from '@angular/core';
import { ViewEditProfileService } from './view-edit-profile.service';
import { untilDestroyed } from '@app/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-edit-profile',
  templateUrl: './view-edit-profile.component.html',
  styleUrls: ['./view-edit-profile.component.scss']
})
export class ViewEditProfileComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
