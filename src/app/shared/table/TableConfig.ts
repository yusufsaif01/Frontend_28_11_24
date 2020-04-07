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
}
