import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../user-service';
// import { Angular2CsvModule } from 'angular2-csv';

@Component({
  selector: 'app-bulk-update',
  templateUrl: './bulk-update.component.html',
  styleUrls: ['./bulk-update.component.scss']
})
export class BulkUpdateComponent implements OnInit {
  fileData: any = null;

  @ViewChild('fileUploadInput', { static: true }) fileUploadInput: ElementRef;
  @ViewChild('fileUploadName', { static: true }) fileUploadName: ElementRef;

  constructor(private userService: UserService) {}
  ngOnInit(): void {}
  onTriggerInput() {
    this.fileUploadInput.nativeElement.click();
  }

  onUpdateFile(fileInput: any) {
    if (this.fileUploadInput.nativeElement.value) {
      this.fileUploadName.nativeElement.textContent = this.fileUploadInput.nativeElement.value.match(
        /[\/\\]([\w\d\s\.\-\(\)]+)$/
      )[1];
    } else {
      this.fileUploadName.nativeElement.textContent = 'No file chosen, yet.';
    }

    this.fileData = <File>fileInput.target.files[0];
  }

  download() {
    let options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: false,
      showTitle: false,

      headers: [
        'email',
        'name',
        'warehouse',
        'location',
        'department',
        'dob',
        'manager',
        'vendor_id',
        'user_id',
        'doj',
        'state',
        'country',
        'phone'
      ]
    };
    new Angular2Csv({}, 'UserCsv', options);
  }

  userCSVImport(form: NgForm) {
    const formData = new FormData();

    if (this.fileData === null) {
      return alert('Please upload correct file !!');
    }

    formData.append('csv_file', this.fileData, this.fileData.name);

    this.userService.importCSV(formData).subscribe(
      success => {
        alert('successfully done !!');
      },
      error => {}
    );
  }
}
