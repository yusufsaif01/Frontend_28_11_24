import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpForForgotPasswordComponent } from './otp-for-forgot-password.component';

describe('OtpForForgotPasswordComponent', () => {
  let component: OtpForForgotPasswordComponent;
  let fixture: ComponentFixture<OtpForForgotPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OtpForForgotPasswordComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpForForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
