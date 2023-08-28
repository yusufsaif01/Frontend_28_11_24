import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEditProfileComponent } from './view-edit-profile.component';

describe('ViewEditProfileComponent', () => {
  let component: ViewEditProfileComponent;
  let fixture: ComponentFixture<ViewEditProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewEditProfileComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
