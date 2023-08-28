import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFootmatesComponent } from './manage-footmates.component';

describe('ManageFootmatesComponent', () => {
  let component: ManageFootmatesComponent;
  let fixture: ComponentFixture<ManageFootmatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManageFootmatesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFootmatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
