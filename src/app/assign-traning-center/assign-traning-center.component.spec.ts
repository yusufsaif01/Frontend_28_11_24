import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTraningCenterComponent } from './assign-traning-center.component';

describe('AssignTraningCenterComponent', () => {
  let component: AssignTraningCenterComponent;
  let fixture: ComponentFixture<AssignTraningCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssignTraningCenterComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignTraningCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
