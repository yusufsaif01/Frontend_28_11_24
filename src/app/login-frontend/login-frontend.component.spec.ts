import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFrontendComponent } from './login-frontend.component';

describe('LoginFrontendComponent', () => {
  let component: LoginFrontendComponent;
  let fixture: ComponentFixture<LoginFrontendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginFrontendComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFrontendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
