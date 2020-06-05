import { TableConfig } from '@app/shared/table/TableConfig';

export class DocumentVerificationTableConfig extends TableConfig {
  constructor() {
    super();
    this.allowedColumns = [
      'serialNumber',
      'player_name',
      'date_of_birth',
      'added_on',
      'document_number',
      'doc_front',
      'doc_back',
      'user_photo',
      'status'
    ];

    this.columns = {
      serialNumber: {
        code: 'serialNumber',
        text: 'S No.',
        getValue: (ele: any) => {
          return ele[this.columns.serialNumber.code];
        }
      },
      player_name: {
        code: 'player_name',
        text: 'Player Name',
        getValue: (ele: any) => {
          return ele[this.columns.player_name.code];
        }
      },
      date_of_birth: {
        code: 'date_of_birth',
        text: 'DOB',
        getValue: (ele: any) => {
          return ele[this.columns.date_of_birth.code];
        }
      },
      added_on: {
        code: 'added_on',
        text: 'Added On',
        getValue: (ele: any) => {
          return ele[this.columns.added_on.code];
        }
      },
      document_number: {
        code: 'document_number',
        text: 'Aadhaar No',
        getValue: (ele: any) => {
          return ele[this.columns.document_number.code];
        }
      },
      doc_front: {
        code: 'doc_front',
        text: 'Aadhaar Front Image',
        getValue: (ele: any) => {
          return ele[this.columns.doc_front.code];
        }
      },
      doc_back: {
        code: 'doc_back',
        text: 'Aadhaar Back Image',
        getValue: (ele: any) => {
          return ele[this.columns.doc_back.code];
        }
      },
      user_photo: {
        code: 'user_photo',
        text: 'Player Image',
        getValue: (ele: any) => {
          return ele[this.columns.user_photo.code];
        }
      },
      status: {
        code: 'status',
        text: 'Status',
        getValue: (ele: any) => {
          return ele[this.columns.status.code];
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
