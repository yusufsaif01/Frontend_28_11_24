import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootmatesComponent } from './footmates.component';

describe('FootmatesComponent', () => {
  let component: FootmatesComponent;
  let fixture: ComponentFixture<FootmatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FootmatesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootmatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
