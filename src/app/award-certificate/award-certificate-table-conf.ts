import { TableConfig } from '@app/shared/table/TableConfig';
export class AwardCertificateTableConfig extends TableConfig {
  constructor() {
    super();
    this.allowedColumns = [
      'serialnumber',
      'awardtype',
      'awardname',
      'year',
      'position_secured',
      'thumbnail'
    ];

    this.columns = {
      serialnumber: {
        code: 'serialnumber',
        text: 'S.No',
        getValue: (ele: any) => {
          return ele[this.columns.serialnumber.code];
        }
      },
      awardtype: {
        code: 'awardtype',
        text: 'Award Type',
        getValue: (ele: any) => {
          return ele[this.columns.awardtype.code];
        }
      },
      awardname: {
        code: 'awardname',
        text: 'Award Name',
        getValue: (ele: any) => {
          return ele[this.columns.awardname.code];
        }
      },
      year: {
        code: 'year',
        text: 'Year',
        getValue: (ele: any) => {
          return ele[this.columns.year.code];
        }
      },
      position_secured: {
        code: 'position_secured',
        text: 'Position Secured',
        getValue: (ele: any) => {
          return ele[this.columns.position_secured.code];
        }
      },
      thumbnail: {
        code: 'thumbnail',
        text: 'Image',
        getValue: (ele: any) => {
          return ele[this.columns.thumbnail.code];
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
