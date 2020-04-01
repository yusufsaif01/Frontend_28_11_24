import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
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
export class TableComponent implements OnInit {
  @Input() displayedColumns: string[] = [];
  @Input() columnsToDisplay: any[] = [];
  @Input() dataSource = new MatTableDataSource([]);
  @Output() idEdit = new EventEmitter<any>();
  @Output() idDelete = new EventEmitter<any>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('nameRef', { static: true }) ElementnameRef: ElementRef;

  constructor() {}

  ngOnInit() {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnchanges() {}

  ngAfterContentInit() {
    // this.ElementnameRef.nativeElement.focus();
  }

  edit(id: any) {
    this.idEdit.emit(id);
  }

  delete(id: string) {
    this.idDelete.emit(id);
  }
}
