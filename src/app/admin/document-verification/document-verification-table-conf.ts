import { TableConfig } from '@app/shared/table/TableConfig';
import moment from 'moment';

export class DocumentVerificationTableConfig extends TableConfig {
  text: string = 'Document Number';
  constructor(member_type: string) {
    super();
    if (member_type === 'player') {
      this.allowedColumns = [
        'serialNumber',
        'player_name',
        'date_of_birth',
        'added_on',
        'document_number',
        'aadhaarimg',
        'user_photo',
        'status'
      ];
      this.text = 'Aadhaar No.';
    } else if (member_type === 'club') {
      this.allowedColumns = [
        'serialNumber',
        'name',
        'added_on',
        'aiff_id',
        'aiff_image',
        'status'
      ];
    } else if (member_type === 'academy') {
      this.allowedColumns = [
        'serialNumber',
        'name',
        'added_on',
        'document_type',
        'document_number',
        'document_image',
        'status'
      ];
    }

    this.columns = {
      serialNumber: {
        code: 'serialNumber',
        text: 'S No.',
        getValue: (ele: any) => {
          return ele[this.columns.serialNumber.code];
        }
      },
      name: {
        code: 'name',
        text: member_type === 'club' ? 'Club Name' : 'Academy Name',
        getValue: (ele: any) => {
          let val: string = ele[this.columns.name.code];
          return val.length > 18 ? `${val.slice(0, 18)}...` : val;
        }
      },
      player_name: {
        code: 'player_name',
        text: 'Player Name',
        getValue: (ele: any) => {
          let val: string = ele[this.columns.player_name.code];
          return val.length > 18 ? `${val.slice(0, 18)}...` : val;
        }
      },
      date_of_birth: {
        code: 'date_of_birth',
        text: 'DOB',
        getValue: (ele: any) => {
          let val: any = moment(ele.date_of_birth);
          val = val.isValid() ? val.format('DD-MMMM-YYYY') : 'NA';
          return `${val}`;
        }
      },
      added_on: {
        code: 'added_on',
        text: 'Added On',
        getValue: (ele: any) => {
          let val: any = moment(ele.added_on);
          val = val.isValid() ? val.format('DD-MMMM-YYYY') : 'NA';
          return `${val}`;
        }
      },
      document_type: {
        code: 'document_type',
        text: 'Document Type',
        getValue: (ele: any) => {
          return ele[this.columns.document_type.code];
        }
      },
      document_number: {
        code: 'document_number',
        text: this.text,
        getValue: (ele: any) => {
          return ele[this.columns.document_number.code];
        }
      },
      document_image: {
        code: 'document_image',
        text: 'Document Image',
        getValue: (ele: any) => {
          return ele[this.columns.document_image.code];
        }
      },
      aadhaarimg: {
        code: 'aadhaarimg',
        text: 'Aadhaar Document',
        getValue: (ele: any) => {
          return ele[this.columns.aadhaarimg.code];
        }
      },
      aiff_id: {
        code: 'aiff_id',
        text: 'AIFF Accreditation ID',
        getValue: (ele: any) => {
          return ele[this.columns.aiff_id.code];
        }
      },
      aiff_image: {
        code: 'aiff_image',
        text: 'AIFF Document Image',
        getValue: (ele: any) => {
          return ele[this.columns.aiff_image.code];
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
