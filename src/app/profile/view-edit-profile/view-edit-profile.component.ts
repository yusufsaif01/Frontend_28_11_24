import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-edit-profile',
  templateUrl: './view-edit-profile.component.html',
  styleUrls: ['./view-edit-profile.component.scss']
})
export class ViewEditProfileComponent implements OnInit {
  componentName: string = 'personal';
  components: any[] = [
    { name: 'Personal details', value: 'personal' },
    { name: 'Professional details', value: 'professional' },
    { name: 'Documents', value: 'documents' },
    { name: 'Employment Contracts', value: 'contracts' }
  ];
  constructor() {}

  ngOnInit() {}

  switch(componentName: string) {
    this.componentName = componentName;
  }
}
