import { TableConfig } from '@app/shared/table/TableConfig';
export class AwardCertificateTableConfig extends TableConfig {
  constructor() {
    super();
    this.allowedColumns = [
      'Ser_no',
      'type',
      'name',
      'year',
      'position',
      'media'
    ];

    this.columns = {
      Ser_no: {
        code: 'Ser_no',
        text: 'Ser.No',
        getValue: (ele: any) => {
          return ele[this.columns.Ser_no.code];
        }
      },
      type: {
        code: 'type',
        text: 'Type',
        getValue: (ele: any) => {
          return ele[this.columns.type.code];
        }
      },
      name: {
        code: 'name',
        text: 'Name',
        getValue: (ele: any) => {
          return ele[this.columns.name.code];
        }
      },
      year: {
        code: 'year',
        text: 'Year',
        getValue: (ele: any) => {
          return ele[this.columns.year.code];
        }
      },
      position: {
        code: 'position',
        text: 'Position secured',
        getValue: (ele: any) => {
          return ele[this.columns.position.code];
        }
      },
      media: {
        code: 'media',
        text: 'Image',
        getValue: (ele: any) => {
          return ele[this.columns.media.code];
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
