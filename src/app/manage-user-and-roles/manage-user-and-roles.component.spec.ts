import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUserAndRolesComponent } from './manage-user-and-roles.component';

describe('ManageUserAndRolesComponent', () => {
  let component: ManageUserAndRolesComponent;
  let fixture: ComponentFixture<ManageUserAndRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManageUserAndRolesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUserAndRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
