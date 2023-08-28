import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDialogClubComponent } from './filter-dialog-club.component';

describe('FilterDialogClubComponent', () => {
  let component: FilterDialogClubComponent;
  let fixture: ComponentFixture<FilterDialogClubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilterDialogClubComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterDialogClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
