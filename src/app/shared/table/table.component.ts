import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  TemplateRef,
  SimpleChanges
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() tableConfig: any = {};
  @Input() TableActions: TemplateRef<any>;
  @Input() NumberColumn: boolean = false;
  @Input() rows = new MatTableDataSource([]);
  // dataSource = new MatTableDataSource<any>();
  // rows = new MatTableDataSource([
  //   {
  //     name: 'Pushpam',
  //     position: 'Sample',
  //     type: 'Sample',
  //     email: 'email',
  //     status: 'pending',
  //     actions: ''
  //   },
  //   {
  //     name: 'Pushpam',
  //     position: 'Sample',
  //     type: 'Sample',
  //     email: 'email',
  //     status: 'pending',
  //     actions: ''
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

  applyFilter(filterValue: string) {
    this.rows.filter = filterValue.trim().toLowerCase();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.rows.sort = this.sort;
  }
}
