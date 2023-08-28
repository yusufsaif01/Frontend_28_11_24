import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubAcademyFootplayerComponent } from './club-academy-footplayer.component';

describe('ClubAcademyFootplayerComponent', () => {
  let component: ClubAcademyFootplayerComponent;
  let fixture: ComponentFixture<ClubAcademyFootplayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClubAcademyFootplayerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubAcademyFootplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
