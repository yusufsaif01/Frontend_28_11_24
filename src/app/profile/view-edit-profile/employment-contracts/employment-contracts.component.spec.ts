import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentContractsComponent } from './employment-contracts.component';

describe('EmploymentContractsComponent', () => {
  let component: EmploymentContractsComponent;
  let fixture: ComponentFixture<EmploymentContractsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmploymentContractsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploymentContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
