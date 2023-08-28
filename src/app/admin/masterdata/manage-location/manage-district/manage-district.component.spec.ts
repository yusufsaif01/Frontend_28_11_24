import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDistrictComponent } from './manage-district.component';

describe('ManageDistrictComponent', () => {
  let component: ManageDistrictComponent;
  let fixture: ComponentFixture<ManageDistrictComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManageDistrictComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
