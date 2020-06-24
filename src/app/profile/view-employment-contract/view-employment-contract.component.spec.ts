import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmploymentContractComponent } from './view-employment-contract.component';

describe('ViewEmploymentContractComponent', () => {
  let component: ViewEmploymentContractComponent;
  let fixture: ComponentFixture<ViewEmploymentContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewEmploymentContractComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEmploymentContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
