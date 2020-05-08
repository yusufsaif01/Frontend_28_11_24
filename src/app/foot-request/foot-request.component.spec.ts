import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootRequestComponent } from './foot-request.component';

describe('FootRequestComponent', () => {
  let component: FootRequestComponent;
  let fixture: ComponentFixture<FootRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FootRequestComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
