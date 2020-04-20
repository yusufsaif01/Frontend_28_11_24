import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardCertificateComponent } from './award-certificate.component';

describe('AwardCertificateComponent', () => {
  let component: AwardCertificateComponent;
  let fixture: ComponentFixture<AwardCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AwardCertificateComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwardCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
