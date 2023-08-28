import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDialogAcademyComponent } from './filter-dialog-academy.component';

describe('FilterDialogAcademyComponent', () => {
  let component: FilterDialogAcademyComponent;
  let fixture: ComponentFixture<FilterDialogAcademyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilterDialogAcademyComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterDialogAcademyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
