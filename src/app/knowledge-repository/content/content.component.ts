import { Title } from '@angular/platform-browser';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { KnowledgeRepositoryService } from '../knowledge-repository.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  @ViewChild('defaultOpen', { static: true }) defaultOpen: ElementRef;
  contentForm: FormGroup;
  aFormGroup: FormGroup;
  selectOptions = ['department1', 'department2'];
  updateMode: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private knowledgeRepoService: KnowledgeRepositoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.createForm();
  }
  ngOnInit() {
    this.defaultOpen.nativeElement.click();
    if (this.activatedRoute.snapshot.queryParams.id) {
      console.log(this.activatedRoute.snapshot.queryParams.id);
      this.updateMode = true;
      this.getContentData(this.activatedRoute.snapshot.queryParams.id);
    }
  }
  submitToDb() {
    if (this.updateMode) {
      this.updateContent();
    } else {
      this.addNewContent();
    }
  }
  addNewContent() {
    if (this.contentForm.invalid) return;

    let reqData = this.createReqData();
    this.knowledgeRepoService.addContent(reqData).subscribe(
      (success: any) => {
        console.log(success);
        this.router.navigateByUrl('knowledge-repo/list');
      },
      error => {
        console.log(error);
      }
    );
  }
  updateContent() {
    if (this.contentForm.invalid) return;

    let reqData = this.createReqData();
    this.knowledgeRepoService.updateContent(this.activatedRoute.snapshot.queryParams.id, reqData).subscribe(
      (success: any) => {
        console.log(success);
        this.updateMode = false;
        this.router.navigateByUrl('knowledge-repo/list');
      },
      error => {
        console.log(error);
      }
    );
  }
  createReqData() {
    let title = this.contentForm.get('title').value;
    let department = this.contentForm.get('departments').value;
    let content = this.contentForm.get('content').value;
    let language = this.contentForm.get('language').value;
    let val = { title: title, departments: [department], content: content, language: language };
    return val;
  }

  openTab(event: any, language: string) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName('tabcontent') as HTMLCollectionOf<HTMLElement>;
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = 'none';
    }
    tablinks = document.getElementsByClassName('tablinks') as HTMLCollectionOf<HTMLElement>;
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(' active', '');
    }
    document.getElementById(language).style.display = 'block';
    (event.target as HTMLInputElement).className += ' active';
  }

  private createForm() {
    this.contentForm = this.formBuilder.group({
      title: ['', Validators.required],
      departments: ['', Validators.required],
      content: ['', Validators.required],
      language: ['english']
    });
  }
  getContentData(id: string) {
    this.knowledgeRepoService.getContentById(id).subscribe(
      (success: any) => {
        console.log(success);
        let title = success.data.title;
        let department = success.data.departments[0];
        let content = success.data.content;
        let language = success.data.language;
        let val = { title: title, departments: department, content: content, language: language };
        this.contentForm.setValue(val);
      },
      error => {
        console.log(error);
      }
    );
  }
}
