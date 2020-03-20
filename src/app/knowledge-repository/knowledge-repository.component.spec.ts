import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeRepositoryComponent } from './knowledge-repository.component';

describe('KnowledgeRepositoryComponent', () => {
  let component: KnowledgeRepositoryComponent;
  let fixture: ComponentFixture<KnowledgeRepositoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KnowledgeRepositoryComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowledgeRepositoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
