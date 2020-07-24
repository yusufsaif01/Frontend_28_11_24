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
  @Output() onChange = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {
    // this.calculatePages();
  }

  getFrame(n: number, l: number) {
    if (n >= l - 3) {
      return [l - 3, l - 2, l - 1];
    }
    if (n === l - 4) {
      return [l - 6, l - 5, l - 4];
    }
    if (n == 5) {
      return [n, n + 1, n + 2];
    }
    if (n > 5) {
      return [n - 1, n, n + 1];
    }
    return [2, 3, 4];
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
    if (arr.length > 5) {
      arr = [
        1,
        this.selectedPage > 4 ? '...' : null,
        ...this.getFrame(this.selectedPage, arr.length),
        this.selectedPage < arr.length - 3 ? '...' : null,
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
