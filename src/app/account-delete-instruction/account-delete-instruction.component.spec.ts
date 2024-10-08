import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDeleteInstructionComponent } from './account-delete-instruction.component';

describe('AccountDeleteInstructionComponent', () => {
  let component: AccountDeleteInstructionComponent;
  let fixture: ComponentFixture<AccountDeleteInstructionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountDeleteInstructionComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDeleteInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
