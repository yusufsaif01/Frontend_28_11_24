import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootPlayerComponent } from './foot-player.component';

describe('FootPlayerComponent', () => {
  let component: FootPlayerComponent;
  let fixture: ComponentFixture<FootPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FootPlayerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
