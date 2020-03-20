import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendSidebarComponent } from './frontend-sidebar.component';

describe('FrontendSidebarComponent', () => {
  let component: FrontendSidebarComponent;
  let fixture: ComponentFixture<FrontendSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FrontendSidebarComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontendSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
