import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateListPopupComponent } from './date-list-popup.component';

describe('DateListPopupComponent', () => {
  let component: DateListPopupComponent;
  let fixture: ComponentFixture<DateListPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DateListPopupComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateListPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
