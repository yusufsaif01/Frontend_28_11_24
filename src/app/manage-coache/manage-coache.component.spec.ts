import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCoacheComponent } from './manage-coache.component';

describe('ManageCoacheComponent', () => {
  let component: ManageCoacheComponent;
  let fixture: ComponentFixture<ManageCoacheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManageCoacheComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCoacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
