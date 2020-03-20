import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionContentListComponent } from './question-content-list.component';

describe('QuestionContentListComponent', () => {
  let component: QuestionContentListComponent;
  let fixture: ComponentFixture<QuestionContentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionContentListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionContentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
