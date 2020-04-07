import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManagePlayerComponent } from './admin-manage-player.component';

describe('AdminManagePlayerComponent', () => {
  let component: AdminManagePlayerComponent;
  let fixture: ComponentFixture<AdminManagePlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminManagePlayerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManagePlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
