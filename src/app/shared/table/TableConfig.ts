import { DomSanitizer } from '@angular/platform-browser';

export class TableConfig {
  public columns: any = {};
  public allowedColumns: string[] = [];
  public enableSno: boolean = true;

  public enableAction: boolean = true;

  constructor() {}

  _titleCase(val: string) {
    val = val[0].toUpperCase() + val.slice(1, val.length);
    return val;
  }

  _classSelector(val: string) {
    let className: string = '';
    switch (val) {
      case 'non-verified' || 'rejected' || 'disapproved':
        className = 'red';
        break;
      case 'verified':
        className = 'black';
        break;
      case 'active' || 'added' || 'approved':
        className = 'green';
        break;
      case 'completed':
        className = 'completeStatus';
        break;
      case 'yet_to_start':
        className = 'yetStatus';
        break;
      case 'pending':
        className = 'pendingStatus';
        break;
    }
    return `<ng-container class=${className}></ng-container>`;
  }
}
