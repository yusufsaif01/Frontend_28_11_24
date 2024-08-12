import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationTypeComponent } from './verification-type.component';

describe('VerificationTypeComponent', () => {
  let component: VerificationTypeComponent;
  let fixture: ComponentFixture<VerificationTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VerificationTypeComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
