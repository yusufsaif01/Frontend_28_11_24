import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  TemplateRef,
  SimpleChanges,
  OnChanges
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
  @Input() page_size: number;
  @Input() page_no: number;
  // dataSource = new MatTableDataSource<any>();
  // rows = new MatTableDataSource([
  //   {
  //     serialnumber: '1',
  //     awardtype: 'Professional',
  //     awardname: 'FIFA World Cup',
  //     year: '1980',
  //     position_secured: 'Second',
  //     thumbnail: '',
  //     actions: ''
  //   },
  //   {
  //     serialnumber: '1',
  //     awardtype: 'Professional',
  //     awardname: 'FIFA World Cup',
  //     year: '1980',
  //     position_secured: 'Second',
  //     thumbnail: '',
  //     actions: ''
  //   },
  //   {
  //     serialnumber: '1',
  //     awardtype: 'Professional',
  //     awardname: 'FIFA World Cup',
  //     year: '1980',
  //     position_secured: 'Second',
  //     thumbnail: '',
  //     actions: ''
  //   },
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

  applyFilter(filterValue: string) {
    this.rows.filter = filterValue.trim().toLowerCase();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.rows.data = this.serialNumberGenerator(
      this.rows.data,
      this.page_size,
      this.page_no
    );

    if (this.sortEnabled) this.rows.sort = this.sort;
  }

  serialNumberGenerator<T extends { serialnumber?: number }>(
    records: T[],
    page_size: number,
    page_no: number
  ): T[] {
    for (let i = 0; i < records.length; i++) {
      if (page_no > 1) {
        records[i].serialnumber = i + 1 + page_size * (page_no - 1);
      } else {
        records[i].serialnumber = i + 1;
      }
    }
    return records;
  }
}
