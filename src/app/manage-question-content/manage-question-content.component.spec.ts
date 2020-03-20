import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageQuestionContentComponent } from './manage-question-content.component';

describe('ManageQuestionContentComponent', () => {
  let component: ManageQuestionContentComponent;
  let fixture: ComponentFixture<ManageQuestionContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManageQuestionContentComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageQuestionContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
