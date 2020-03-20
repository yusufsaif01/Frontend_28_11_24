import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeRepoListComponent } from './knowledge-repo-list.component';

describe('KnowledgeRepoListComponent', () => {
  let component: KnowledgeRepoListComponent;
  let fixture: ComponentFixture<KnowledgeRepoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KnowledgeRepoListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowledgeRepoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
