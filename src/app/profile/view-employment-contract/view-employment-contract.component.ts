import { Component, OnInit } from '@angular/core';
import { PanelOptions } from '@app/shared/models/panel-options.model';
import { MatDialog } from '@angular/material/dialog';
import { ContractService } from './contract.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VerificationPopupComponent } from '@app/admin/verification-popup/verification-popup.component';

@Component({
  selector: 'app-view-employment-contract',
  templateUrl: './view-employment-contract.component.html',
  styleUrls: ['./view-employment-contract.component.scss']
})
export class ViewEmploymentContractComponent implements OnInit {
  panelOptions: Partial<PanelOptions> = {
    player_type: false,
    logout_link: true,
    achievements: true,
    footplayers: true,
    is_public: false
  };
  contractId: string = '';
  contractDetails: any = {};
  memberType: string = '';

  constructor(
    public dialog: MatDialog,
    private _contractService: ContractService,
    private _route: ActivatedRoute,
    private _toastrService: ToastrService
  ) {
    this._route.params.subscribe(params => {
      this.contractId = params['id'];
    });
  }

  ngOnInit() {
    this.getContractDetails();
  }

  getContractDetails() {
    this._contractService.getContractDetails(this.contractId).subscribe(
      (response: any) => {
        this.contractDetails = response.data;
        this.memberType = localStorage.getItem('member_type');
      },
      error => {
        this._toastrService.error(error.error.message, 'Error');
      }
    );
  }

  updateContractStatus(status: string) {
    let message: string = '';
    let header: string = '';
    let disApprove: boolean = false;
    if (status === 'disapproved') {
      header = 'Please Confirm';
      message = 'Please specify a reason for disapproval';
      disApprove = true;
    }
    if (status === 'approved') {
      (header = 'Please Confirm'),
        (message = `Do you want to approve the Employment Contract with ${
          this.contractDetails.clubAcademyName
        } ${this.contractDetails.category === 'club' ? 'club' : 'academy'} ?`);
      disApprove = false;
    }
    const dialogRef = this.dialog.open(VerificationPopupComponent, {
      width: '50%',
      data: {
        header: header,
        message: message,
        disApprove: disApprove
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        let data = {
          remarks: status === 'disapproved' ? result : ' ',
          status: status
        };
        this._contractService
          .updateContractStatus(this.contractId, data)
          .subscribe(
            (response: any) => {
              this.getContractDetails();
              this._toastrService.success(
                response.status,
                'Status updated successfully'
              );
            },
            (error: any) => {
              this._toastrService.error(error.error.message, 'Error');
            }
          );
      }
    });
  }
}
