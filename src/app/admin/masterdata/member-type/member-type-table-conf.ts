import { MasterTableConfig } from '@app/shared/master-table/MasterTableConfig';

export class MemberTypeTableConfig extends MasterTableConfig {
  constructor() {
    super();
    this.allowedColumns = ['serialNo', 'MemberCategory', 'MemberSubCategory'];

    this.columns = {
      serialNo: {
        code: 'serialNo',
        text: 'S.No',
        getValue: (ele: any) => {
          return ele[this.columns.serialNo.code];
        }
      },
      MemberCategory: {
        code: 'MemberCategory',
        text: 'Member Category',
        getValue: (ele: any) => {
          return ele[this.columns.MemberCategory.code];
        }
      },
      MemberSubCategory: {
        code: 'MemberSubCategory',
        text: 'Member Subcategory',
        getValue: (ele: any) => {
          return ele[this.columns.MemberSubCategory.code];
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
