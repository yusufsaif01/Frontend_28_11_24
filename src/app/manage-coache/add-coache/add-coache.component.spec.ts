import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFootplayerComponent } from './add-coache.component';

describe('AddFootplayerComponent', () => {
  let component: AddFootplayerComponent;
  let fixture: ComponentFixture<AddFootplayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddFootplayerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFootplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
