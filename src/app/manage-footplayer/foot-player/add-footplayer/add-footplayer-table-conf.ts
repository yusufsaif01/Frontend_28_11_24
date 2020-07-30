import { TableConfig } from '@app/shared/table/TableConfig';
export class AddFootPlayerTableConfig extends TableConfig {
  constructor() {
    super();
    this.allowedColumns = ['name', 'category', 'position'];

    this.columns = {
      name: {
        code: 'name',
        text: 'Name',
        getValue: (ele: any) => {
          return ele[this.columns.name.code];
        }
      },
      category: {
        code: 'category',
        text: 'Category',
        getValue: (ele: any) => {
          return ele[this.columns.category.code];
        }
      },
      position: {
        code: 'position',
        text: 'Position',
        getValue: (ele: any) => {
          return ele[this.columns.position.code];
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
