import { MasterTableConfig } from '@app/shared/master-table/MasterTableConfig';

export class MemberTypeTableConfig extends MasterTableConfig {
  constructor() {
    super();
    this.allowedColumns = ['serialNumber', 'category', 'sub_category'];

    this.columns = {
      serialNumber: {
        code: 'serialNumber',
        text: 'S.No',
        getValue: (ele: any) => {
          return ele[this.columns.serialNumber.code];
        }
      },
      category: {
        code: 'category',
        text: 'Member Category',
        getValue: (ele: any) => {
          return ele[this.columns.category.code];
        }
      },
      sub_category: {
        code: 'sub_category',
        text: 'Member Subcategory',
        getValue: (ele: any) => {
          return ele[this.columns.sub_category.code];
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
