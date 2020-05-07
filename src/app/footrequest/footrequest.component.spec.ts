import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootrequestComponent } from './footrequest.component';

describe('FootrequestComponent', () => {
  let component: FootrequestComponent;
  let fixture: ComponentFixture<FootrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FootrequestComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
