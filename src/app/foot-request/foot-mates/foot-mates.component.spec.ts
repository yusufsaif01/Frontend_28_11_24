import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootMatesComponent } from './foot-mates.component';

describe('FootMatesComponent', () => {
  let component: FootMatesComponent;
  let fixture: ComponentFixture<FootMatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FootMatesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootMatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
