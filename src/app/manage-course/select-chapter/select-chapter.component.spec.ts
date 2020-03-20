import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectChapterComponent } from './select-chapter.component';

describe('SelectChapterComponent', () => {
  let component: SelectChapterComponent;
  let fixture: ComponentFixture<SelectChapterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectChapterComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
