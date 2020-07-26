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
  @Input() selectedPage: any = 1;
  maxPage: any = 1;
  paginationSize = 5;
  @Output() onChange = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {
    // this.calculatePages();
  }

  getFrame(s: number, n: number, l: number) {
    // starting
    if (n < s) {
      return Array(s - 2)
        .fill(0)
        .map((_, i) => i + 2);
    }
    // ending
    if (n >= l - (s - 2)) {
      return Array(s - 2)
        .fill(0)
        .map((_, i) => l - (s - 2 - i));
    }
    // before ending
    if (n === l - (s - 1)) {
      return Array(s - 2)
        .fill(0)
        .map((_, i) => l - (s + 1 - i));
    }
    // after starting
    if (n == s) {
      return Array(s - 2)
        .fill(0)
        .map((_, i) => n + i);
    }
    // mid
    if (n > s) {
      return Array(s - 2)
        .fill(0)
        .map((_, i) => n - 1 + i);
    }
  }

  pages() {
    this.maxPage =
      this.totalRows / this.rowsPerPage +
      (this.totalRows % this.rowsPerPage > 0 ? 1 : 0);
    this.maxPage = parseInt(this.maxPage);
    if (!this.maxPage) {
      this.maxPage = 1;
    }
    let arr: (number | string)[] = Array(this.maxPage)
      .fill(0)
      .map((x, i) => i + 1);
    if (arr.length > this.paginationSize) {
      arr = [
        1,
        this.selectedPage > this.paginationSize - 1 ? '...' : null,
        ...this.getFrame(this.paginationSize, this.selectedPage, arr.length),
        this.selectedPage < arr.length - (this.paginationSize - 2) ||
        this.selectedPage < this.paginationSize
          ? '...'
          : null,
        arr.length
      ];
      arr = arr.filter(item => {
        return item != null;
      });
    }

    return arr;
  }

  ngOnchanges() {}

  goToPage(number: number) {
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
