import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDialogPlayerComponent } from './filter-dialog-player.component';

describe('FilterDialogPlayerComponent', () => {
  let component: FilterDialogPlayerComponent;
  let fixture: ComponentFixture<FilterDialogPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilterDialogPlayerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterDialogPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
