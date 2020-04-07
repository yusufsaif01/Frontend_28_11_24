import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAcademyComponent } from './manage-academy.component';

describe('ManageAcademyComponent', () => {
  let component: ManageAcademyComponent;
  let fixture: ComponentFixture<ManageAcademyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManageAcademyComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAcademyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
