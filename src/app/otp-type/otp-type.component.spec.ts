import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpTypeComponent } from './otp-type.component';

describe('OtpTypeComponent', () => {
  let component: OtpTypeComponent;
  let fixture: ComponentFixture<OtpTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OtpTypeComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
