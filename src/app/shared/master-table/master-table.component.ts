import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  TemplateRef,
  SimpleChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-master-table',
  templateUrl: './master-table.component.html',
  styleUrls: ['./master-table.component.scss']
})
export class MasterTableComponent implements OnInit {
  @Input() tableConfig: any = {};
  @Input() TableActions: TemplateRef<any>;
  // @Input() Inputs: TemplateRef<any>;
  @Input() sortEnabled: boolean = false;
  @Input() row: any = {};
  @Input() editMode: boolean = false;
  @Input() NumberColumn: boolean = false;
  @Input() rows = new MatTableDataSource([]);
  @Input() TableOptions: {};
  @Output() event: EventEmitter<any> = new EventEmitter<any>();
  obj: any = {};
  @Input() update: any = '';
  @Input() pageSize: number;
  @Input() pageNo: number;
  // dataSource = new MatTableDataSource<any>();
  // rows = new MatTableDataSource([
  //   {
  //     serialNo: '1',
  //     ability: 'Physical'
  //   },
  //   {
  //     serialNo: '2',
  //     ability: 'Mental'
  //   },
  //   {
  //     serialNo: '3',
  //     ability: 'Goal Keeping'
  //   },
  //   {
  //     serialNo: '4',
  //     ability: 'Technical'
  //   }
  // ]);
  public columns: string[] = [];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('nameRef', { static: true }) ElementnameRef: ElementRef;

  constructor() {}

  ngOnInit() {
    this.columns = this.tableConfig.allowedColumns;
    if (this.TableActions) {
      this.columns = this.columns.concat('action');
    }
    // if (this.NumberColumn) {
    //   this.columns = ['sno'].concat(this.columns);
    // }

    // this.dataSource.paginator = this.paginator;
  }
  onChange(name: any, element: any) {
    let key = name.name;
    let value = name.viewModel;
    this.obj = element;
    let keys = Object.keys(this.obj);
    if (keys.includes(name.name)) {
      this.obj[key] = value;
    }
  }

  applyFilter(filterValue: string) {
    this.rows.filter = filterValue.trim().toLowerCase();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.update && changes.update.currentValue == 'update') {
      this.event.emit(this.obj);
      this.obj = {};
    }
    if (changes.update && changes.update.currentValue == 'cancel') {
      this.obj = {};
      this.event.emit('cancelled');
    }
    if (this.sortEnabled) this.rows.sort = this.sort;
    this.rows.data = this.serialNumberGenerator();
  }
  serialNumberGenerator() {
    let data = this.rows.data;
    for (let i = 0; i < data.length; i++) {
      if (this.pageNo > 1) {
        data[i].serialNumber = i + 1 + this.pageSize * (this.pageNo - 1);
      } else {
        data[i].serialNumber = i + 1;
      }
    }
    return data;
  }
}
