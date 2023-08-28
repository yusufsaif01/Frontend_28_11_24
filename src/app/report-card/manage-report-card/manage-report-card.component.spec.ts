import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageReportCardComponent } from './manage-report-card.component';

describe('ManageReportCardComponent', () => {
  let component: ManageReportCardComponent;
  let fixture: ComponentFixture<ManageReportCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManageReportCardComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageReportCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
