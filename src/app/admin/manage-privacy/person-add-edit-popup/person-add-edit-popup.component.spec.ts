import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonAddEditPopupComponent } from './person-add-edit-popup.component';

describe('PersonAddEditPopupComponent', () => {
  let component: PersonAddEditPopupComponent;
  let fixture: ComponentFixture<PersonAddEditPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonAddEditPopupComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonAddEditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
