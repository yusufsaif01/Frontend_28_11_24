import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterLinkComponent } from './enter-link.component';

describe('EnterLinkComponent', () => {
  let component: EnterLinkComponent;
  let fixture: ComponentFixture<EnterLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EnterLinkComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
