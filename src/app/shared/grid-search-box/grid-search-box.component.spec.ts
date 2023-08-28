import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridSearchBoxComponent } from './grid-search-box.component';

describe('GridSearchBoxComponent', () => {
  let component: GridSearchBoxComponent;
  let fixture: ComponentFixture<GridSearchBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GridSearchBoxComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridSearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
