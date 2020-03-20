import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterListingComponent } from './course-listing.component';

describe('ChapterListingComponent', () => {
  let component: ChapterListingComponent;
  let fixture: ComponentFixture<ChapterListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChapterListingComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
