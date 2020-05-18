import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MutualFootmateComponent } from './mutual-footmate.component';

describe('MutualFootmateComponent', () => {
  let component: MutualFootmateComponent;
  let fixture: ComponentFixture<MutualFootmateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MutualFootmateComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MutualFootmateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
