import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpopupComponent } from './addpopup.component';

describe('AddpopupComponent', () => {
  let component: AddpopupComponent;
  let fixture: ComponentFixture<AddpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddpopupComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
