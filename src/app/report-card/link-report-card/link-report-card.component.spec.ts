import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkReportCardComponent } from './link-report-card.component';

describe('LinkReportCardComponent', () => {
  let component: LinkReportCardComponent;
  let fixture: ComponentFixture<LinkReportCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LinkReportCardComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkReportCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
