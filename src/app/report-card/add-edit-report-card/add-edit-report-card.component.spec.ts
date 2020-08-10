import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditReportCardComponent } from './add-edit-report-card.component';

describe('AddEditReportCardComponent', () => {
  let component: AddEditReportCardComponent;
  let fixture: ComponentFixture<AddEditReportCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditReportCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditReportCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
