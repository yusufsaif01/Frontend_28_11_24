import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpPhoneComponent } from './otp-phone.component';

describe('OtpPhoneComponent', () => {
  let component: OtpPhoneComponent;
  let fixture: ComponentFixture<OtpPhoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OtpPhoneComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
