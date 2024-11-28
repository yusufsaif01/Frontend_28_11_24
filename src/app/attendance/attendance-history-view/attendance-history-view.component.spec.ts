import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceHistoryViewComponent } from './attendance-history-view.component';

describe('AttendanceHistoryViewComponent', () => {
  let component: AttendanceHistoryViewComponent;
  let fixture: ComponentFixture<AttendanceHistoryViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AttendanceHistoryViewComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceHistoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
