import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAndUpdateQuestionComponent } from './create-and-update-question.component';

describe('CreateAndUpdateQuestionComponent', () => {
  let component: CreateAndUpdateQuestionComponent;
  let fixture: ComponentFixture<CreateAndUpdateQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAndUpdateQuestionComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAndUpdateQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
