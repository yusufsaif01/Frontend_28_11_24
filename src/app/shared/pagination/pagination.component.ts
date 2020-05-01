import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() showData: boolean = true;
  @Input() showCount: any = 0;
  @Input() totalRows: any = 0;
  @Input() rowsPerPage: any = 10;
  selectedPage: any = 1;
  private maxPage: any = 1;
  @Output() onChange = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {
    // this.calculatePages();
  }

  pages() {
    this.maxPage =
      this.totalRows / this.rowsPerPage +
      (this.totalRows % this.rowsPerPage > 0 ? 1 : 0);
    this.maxPage = parseInt(this.maxPage);
    if (!this.maxPage) {
      this.maxPage = 1;
    }
    let arr = Array(this.maxPage)
      .fill(0)
      .map((x, i) => i + 1);
    return arr;
  }

  ngOnchanges() {}

  goToPage(number: Number) {
    if (number > this.maxPage || number < 1) {
      return;
    }
    this.selectedPage = number;
    this.onChange.emit({ selectedPage: number });
  }

  ngAfterContentInit() {
    // this.ElementnameRef.nativeElement.focus();
  }
}
