import { TableConfig } from '@app/shared/table/TableConfig';

export class ManageAbilityTableConfig extends TableConfig {
  constructor() {
    super();
    this.allowedColumns = ['serialNo', 'ability'];

    this.columns = {
      serialNo: {
        code: 'serialNo',
        text: 'S.No',
        getValue: (ele: any) => {
          return ele[this.columns.serialNo.code];
        }
      },
      ability: {
        code: 'ability',
        text: 'Ability',
        getValue: (ele: any) => {
          return ele[this.columns.ability.code];
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
