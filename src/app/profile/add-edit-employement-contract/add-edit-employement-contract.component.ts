import { Component, OnInit } from '@angular/core';
import { PanelOptions } from '@app/shared/models/panel-options.model';

@Component({
  selector: 'app-add-edit-employement-contract',
  templateUrl: './add-edit-employement-contract.component.html',
  styleUrls: ['./add-edit-employement-contract.component.scss']
})
export class AddEditEmployementContractComponent implements OnInit {
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
