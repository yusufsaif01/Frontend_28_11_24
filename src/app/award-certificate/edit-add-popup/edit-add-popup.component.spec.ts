import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddPopupComponent } from './edit-add-popup.component';

describe('EditAddPopupComponent', () => {
  let component: EditAddPopupComponent;
  let fixture: ComponentFixture<EditAddPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditAddPopupComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
