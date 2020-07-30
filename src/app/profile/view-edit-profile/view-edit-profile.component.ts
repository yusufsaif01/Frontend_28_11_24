import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-edit-profile',
  templateUrl: './view-edit-profile.component.html',
  styleUrls: ['./view-edit-profile.component.scss']
})
export class ViewEditProfileComponent implements OnInit {
  clubAcademyType: string;
  componentName: string = 'personal';
  memberType: string = 'player';
  renderComponents: any[];
  components: any[] = [
    { name: 'Personal details', value: 'personal' },
    { name: 'Professional details', value: 'professional' },
    { name: 'Documents', value: 'documents' },
    { name: 'Employment contracts', value: 'contracts' }
  ];
  constructor() {}

  ngOnInit() {}

  switch(componentName: string) {
    this.componentName = componentName;
  }

  getClubAcademyType(value: string) {
    this.clubAcademyType = value;
  }

  getMemberType(value: string) {
    this.memberType = value;
    this.renderComponents = this.components.filter(item => {
      if (this.memberType !== 'player') return item.value !== 'contracts';
      return item.value;
    });
  }
}
