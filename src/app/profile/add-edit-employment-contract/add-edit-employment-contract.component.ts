import { Component, OnInit } from '@angular/core';
import { PanelOptions } from '@app/shared/models/panel-options.model';

@Component({
  selector: 'app-add-edit-employment-contract',
  templateUrl: './add-edit-employment-contract.component.html',
  styleUrls: ['./add-edit-employment-contract.component.scss']
})
export class AddEditEmploymentContractComponent implements OnInit {
  panelOptions: Partial<PanelOptions> = {
    player_type: false,
    logout_link: true,
    achievements: true,
    footplayers: true,
    is_public: false
  };
  constructor() {}

  ngOnInit() {}
}
