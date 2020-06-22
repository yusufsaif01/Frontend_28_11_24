import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditEmploymentContractComponent } from './add-edit-employment-contract.component';

describe('AddEditEmploymentContractComponent', () => {
  let component: AddEditEmploymentContractComponent;
  let fixture: ComponentFixture<AddEditEmploymentContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditEmploymentContractComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditEmploymentContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
