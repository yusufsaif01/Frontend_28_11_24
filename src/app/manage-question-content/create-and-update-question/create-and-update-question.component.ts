import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EnterLinkComponent } from '../enter-link/enter-link.component';

@Component({
  selector: 'app-create-and-update-question',
  templateUrl: './create-and-update-question.component.html',
  styleUrls: ['./create-and-update-question.component.scss']
})
export class CreateAndUpdateQuestionComponent implements OnInit {
  @ViewChild('defaultOpen', { static: true }) defaultOpen: ElementRef;
  @ViewChild('fileUploadInput', { static: true }) fileUploadInput: ElementRef;
  @ViewChild('fileUploadName', { static: true }) fileUploadName: ElementRef;

  constructor(public dialog: MatDialog) {}
  enterLinkModal(): void {
    const dialogRef = this.dialog.open(EnterLinkComponent, {
      width: '72.75%',
      panelClass: 'enterLinkModal'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  ngOnInit() {
    this.defaultOpen.nativeElement.click();
  }
  onTriggerInput() {
    this.fileUploadInput.nativeElement.click();
  }
  onUpdateFile() {
    if (this.fileUploadInput.nativeElement.value) {
      this.fileUploadName.nativeElement.textContent = this.fileUploadInput.nativeElement.value.match(
        /[\/\\]([\w\d\s\.\-\(\)]+)$/
      )[1];
    } else {
      this.fileUploadName.nativeElement.textContent = 'No file chosen, yet.';
    }
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
}
