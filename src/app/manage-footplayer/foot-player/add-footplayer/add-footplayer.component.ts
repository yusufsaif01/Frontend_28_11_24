import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddFootPlayerTableConfig } from './add-footplayer-table-conf';
@Component({
  selector: 'app-add-footplayer',
  templateUrl: './add-footplayer.component.html',
  styleUrls: ['./add-footplayer.component.scss']
})
export class AddFootplayerComponent implements OnInit {
  // TABLE CONFIG
  public tableConfig: AddFootPlayerTableConfig = new AddFootPlayerTableConfig();
  public dataSource = new MatTableDataSource([]);
  constructor(public dialogRef: MatDialogRef<AddFootplayerComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {}
}
