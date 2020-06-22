import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisapproveConfirmationComponent } from './Disapprove-confirmation.component';

describe('DisapproveConfirmationComponent', () => {
  let component: DisapproveConfirmationComponent;
  let fixture: ComponentFixture<DisapproveConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DisapproveConfirmationComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisapproveConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
