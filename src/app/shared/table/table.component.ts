import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  TemplateRef,
  SimpleChanges,
  OnChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {
  @Input() tableConfig: any = {};
  @Input() TableActions: TemplateRef<any>;
  @Input() NumberColumn: boolean = false;
  @Input() sortEnabled: boolean = false;
  @Input() rows = new MatTableDataSource([]);
  @Input() pageSize: number = 10;
  @Input() pageNo: number = 1;
  @Output() imgLink: EventEmitter<string> = new EventEmitter<string>();
  dataSource = new MatTableDataSource<any>();
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

  applyFilter(filterValue: string) {
    this.rows.filter = filterValue.trim().toLowerCase();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.rows) this.rows.data = this.serialNumberGenerator();

    if (this.sortEnabled) this.rows.sort = this.sort;
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
  openDialog(imgLink: string) {
    this.imgLink.emit(imgLink);
  }
}
