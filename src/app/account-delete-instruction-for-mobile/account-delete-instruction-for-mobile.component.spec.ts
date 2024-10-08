import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDeleteInstructionForMobileComponent } from './account-delete-instruction-for-mobile.component';

describe('AccountDeleteInstructionForMobileComponent', () => {
  let component: AccountDeleteInstructionForMobileComponent;
  let fixture: ComponentFixture<AccountDeleteInstructionForMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountDeleteInstructionForMobileComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      AccountDeleteInstructionForMobileComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
