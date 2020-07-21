import { TableConfig } from '@app/shared/table/TableConfig';
import moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';
export class EmploymentContractListTableConfig extends TableConfig {
  constructor() {
    // constructor(private _sanitizer: DomSanitizer) {
    super();
    this.allowedColumns = [
      'name',
      'effective_date',
      'expiry_date',
      'created_by',
      'status'
    ];

    this.columns = {
      name: {
        code: 'name',
        text: 'Club / Academy',
        getValue: (ele: any) => {
          return ele[this.columns.name.code];
        }
      },
      effective_date: {
        code: 'effective_date',
        text: 'Effective Date',
        getValue: (ele: any) => {
          let val: any = moment(ele.effective_date);
          val = val.isValid() ? val.format('DD-MMMM-YYYY') : 'NA';
          return `${val}`;
        }
      },
      expiry_date: {
        code: 'expiry_date',
        text: 'Expiry Date',
        getValue: (ele: any) => {
          let val: any = moment(ele.expiry_date);
          val = val.isValid() ? val.format('DD-MMMM-YYYY') : 'NA';
          return `${val}`;
        }
      },
      created_by: {
        code: 'created_by',
        text: 'Created By',
        getValue: (ele: any) => {
          return ele[this.columns.created_by.code];
        }
      },
      status: {
        code: 'status',
        text: 'Status',
        getValue: (ele: any) => {
          // return ele[this.columns.status.code];
          // return this._sanitizer.bypassSecurityTrustHtml(this._classSelector(ele[this.columns.status.code]));
          return `<p [ngClass]="{
            red: ['non-verified', 'rejected', 'disapproved'].includes(
              ${ele[this.columns.status.code]}
            ),
            black: ['verified'].includes(${ele[this.columns.status.code]}),
            green: ['active', 'added', 'approved'].includes(${
              ele[this.columns.status.code]
            }),
            completeStatus: ['completed'].includes(${
              ele[this.columns.status.code]
            }),
            yetStatus: ['yet_to_start'].includes(${
              ele[this.columns.status.code]
            }),
            pendingStatus: ['pending'].includes(${
              ele[this.columns.status.code]
            })
          }">${ele[this.columns.status.code]}</p>`;
        }
      },
      action: {
        code: 'action',
        text: 'Action',
        getValue: (ele: any) => {
          return ele[this.columns.action.code];
        }
      }
    };
  }
}
