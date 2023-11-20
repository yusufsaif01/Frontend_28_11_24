import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerSuggestionComponent } from './player-suggestion.component';

describe('PlayerSuggestionComponent', () => {
  let component: PlayerSuggestionComponent;
  let fixture: ComponentFixture<PlayerSuggestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerSuggestionComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
