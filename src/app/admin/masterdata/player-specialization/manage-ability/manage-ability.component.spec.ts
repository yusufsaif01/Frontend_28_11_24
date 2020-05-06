import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAbilityComponent } from './manage-ability.component';

describe('ManageAbilityComponent', () => {
  let component: ManageAbilityComponent;
  let fixture: ComponentFixture<ManageAbilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManageAbilityComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAbilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
