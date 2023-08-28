import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
  Input
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilKeyChanged } from 'rxjs/operators';
import { untilDestroyed } from '@app/core';

@Component({
  selector: 'app-grid-search-box',
  templateUrl: './grid-search-box.component.html',
  styleUrls: ['./grid-search-box.component.scss']
})
export class GridSearchBoxComponent implements OnInit, OnDestroy {
  @Input() placeholder = '';
  @Output() sendSearchText = new EventEmitter<string>();
  subject: Subject<{ searchText: string }> = new Subject();

  constructor() {}

  ngOnDestroy() {}

  ngOnInit() {
    this.searchInit();
  }

  getSearchText(event: any) {
    let value = event.target.value;
    this.subject.next({
      searchText: value
    });
  }

  searchInit() {
    this.subject
      .pipe(
        distinctUntilKeyChanged('searchText'),
        debounceTime(1000),
        untilDestroyed(this)
      )
      .subscribe(value => {
        this.sendSearchText.emit(value.searchText.trim());
      });
  }
}
