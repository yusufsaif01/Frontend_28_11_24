import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraningCenterComponent } from './traning-center.component';

describe('TraningCenterComponent', () => {
  let component: TraningCenterComponent;
  let fixture: ComponentFixture<TraningCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TraningCenterComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraningCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
