import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MutualFootmateComponent } from '@app/foot-request/mutual-footmate/mutual-footmate.component';
import { FootMatesService } from './foot-mates.service';
import { environment } from '../../environments/environment';
import { untilDestroyed } from '@app/core';
import { ToastrService } from 'ngx-toastr';

interface FootMatesContext {
  name: string;
  position: string;
  player_type: string;
  avatar: string;
  user_id: string;
  mutuals: number;
}

@Component({
  selector: 'app-footmates',
  templateUrl: './foot-mates.component.html',
  styleUrls: ['./foot-mates.component.scss']
})
export class FootMatesComponent implements OnInit {
  filter: any = {};
  pageNo: number = 1;
  countryData: any[] = [];
  positions: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  checkFilters: boolean | undefined = undefined;
  positionsArray: any[] = [];
  playerTypeArray: any[] = [];
  ageRangeArray: any[] = [];
  strongFootArray: any[] = [];
  countryID: string = '';
  stateID: string = '';
  countryValue: string = '';
  stateValue: string = '';
  cityValue: string = '';
  public active: boolean;
  checkPlayerTypeFilters: boolean | undefined = undefined;
  checkAgeRangeFilters: boolean | undefined = undefined;
  checkStrongFootFilters: boolean | undefined = undefined;

  menuOpened() {
    if (this.active) {
      this.active = false;
    } else {
      this.active = true;
    }
  }

  panelOptions: object = {
    bio: true,
    member_type: true,
    my_achievements: false,
    view_profile_link: false,
    player_type: true,
    follows_buttons: false
  };
  // foot_request_count = 0;
  // foot_mate_count = 0;
  foot_data: any;
  pageSize: number = 20;
  show_count: number = 0;
  total_count: number = 0;
  footMatesList: FootMatesContext[] = [];
  constructor(
    public dialog: MatDialog,
    private footMatesService: FootMatesService,
    private toastrService: ToastrService
  ) {}
  // MatualFootmates
  openDialog(foot_mate: any): void {
    const dialogRef = this.dialog.open(MutualFootmateComponent, {
      width: '40%',
      panelClass: 'MatualFootmate',
      data: { id: foot_mate.user_id }
    });
  }

  ngOnInit() {
    this.filter.page_size = this.pageSize;
    this.filter.page_no = 1;
    this.getLocationStats();
    this.getFootMateList();
    this.getConnectionStats({});
    this.getPositionsListing();
  }
  getLocationStats() {
    this.footMatesService
      .getLocationStats()
      .pipe(untilDestroyed(this))
      .subscribe(
        (response: any) => {
          this.countryData = response.data;
        },
        error => {
          this.toastrService.error('Error', error.error.message);
        }
      );
  }
  getCitiesListing(countryID: string, stateID: string) {
    this.footMatesService
      .getCitiesListing(countryID, stateID)
      .pipe(untilDestroyed(this))
      .subscribe(
        (response: any) => {
          this.cities = response.data.records;
        },
        error => {
          this.toastrService.error('Error', error.error.message);
        }
      );
  }
  getStatesListing(countryID: string) {
    this.footMatesService
      .getStatesListing(countryID)
      .pipe(untilDestroyed(this))
      .subscribe(
        (response: any) => {
          this.states = response.data.records;
        },
        error => {
          this.toastrService.error('Error', error.error.message);
        }
      );
  }
  getPositionsListing() {
    this.footMatesService
      .getPositionsListing()
      .pipe(untilDestroyed(this))
      .subscribe(
        (response: any) => {
          this.positions = response.data.records;
        },
        error => {
          this.toastrService.error('Error', error.error.message);
        }
      );
  }
  getFootMateList() {
    this.footMatesService.getFootMateList(this.filter).subscribe(
      response => {
        let records = response.data.records;
        for (let i = 0; i < records.length; i++) {
          records[i]['avatar'] = environment.mediaUrl + records[i]['avatar'];
        }
        this.footMatesList = records;
        this.show_count = response.data.records.length;
      },
      error => {}
    );
  }

  onSelectCountry(event: any) {
    if (event.target.value) {
      let countryData = JSON.parse(event.target.value);
      this.countryID = countryData.country_id;
      this.getStatesListing(this.countryID);
      this.filter.country = countryData.country;
    } else {
      this.cities = [];
      this.states = [];
      delete this.filter.country;
      delete this.filter.state;
      delete this.filter.city;
    }
    this.getFootMateList();
  }

  getCountryValue(country: any) {
    if (country) {
      return JSON.stringify(country);
    } else return '';
  }

  getStateValue(state: any) {
    if (state) {
      return JSON.stringify(state);
    } else return '';
  }

  getCityValue(city: any) {
    if (city) {
      return JSON.stringify(city);
    } else return '';
  }

  onSelectState(event: any) {
    if (event.target.value) {
      let stateData = JSON.parse(event.target.value);
      this.stateID = stateData.id;
      this.getCitiesListing(this.countryID, this.stateID);
      this.filter.state = stateData.name;
    } else {
      this.cities = [];
      delete this.filter.state;
    }
    this.getFootMateList();
  }

  onSelectCity(event: any) {
    if (event.target.value) {
      let cityData = JSON.parse(event.target.value);
      this.filter.city = cityData.name;
    } else {
      delete this.filter.city;
    }
    this.getFootMateList();
  }

  clearFilters() {
    this.filter = {};
    this.filter.page_size = this.pageSize;
    this.filter.page_no = this.pageNo;
    this.getFootMateList();
    this.checkFilters = false;
    this.checkPlayerTypeFilters = false;
    this.checkAgeRangeFilters = false;
    this.checkStrongFootFilters = false;
    this.positionsArray = [];
    this.playerTypeArray = [];
    this.ageRangeArray = [];
    this.strongFootArray = [];
    this.countryValue = '';
    this.stateValue = '';
    this.cityValue = '';
  }

  onChangePosition(event: any) {
    let positionName: any = event.source.value;
    if (event.checked) {
      this.checkFilters = undefined;
      if (!this.positionsArray.includes(positionName)) {
        this.positionsArray.push(positionName);
      }
    } else {
      this.positionsArray.forEach((element: any, index) => {
        if (element == positionName) {
          this.positionsArray.splice(index, 1);
        }
      });
    }
    let positionString = this.positionsArray.join(',');
    this.filter.position = positionString;
    this.getFootMateList();
  }

  onChangePlayerType(event: any) {
    let playerType: any = event.source.value;
    if (event.checked) {
      this.checkPlayerTypeFilters = undefined;
      if (!this.playerTypeArray.includes(playerType)) {
        this.playerTypeArray.push(playerType);
      }
    } else {
      this.playerTypeArray.forEach((element: any, index) => {
        if (element == playerType) {
          this.playerTypeArray.splice(index, 1);
        }
      });
    }
    let playerTypeStrint = this.playerTypeArray.join(',');
    this.filter.player_category = playerTypeStrint;
    this.getFootMateList();
  }

  onChangeRange(event: any) {
    let ageRange: any = event.source.value;
    if (event.checked) {
      this.checkAgeRangeFilters = undefined;
      if (!this.ageRangeArray.includes(ageRange)) {
        this.ageRangeArray.push(ageRange);
      }
    } else {
      this.ageRangeArray.forEach((element: any, index) => {
        if (element == ageRange) {
          this.ageRangeArray.splice(index, 1);
        }
      });
    }
    let ageRangeString = this.ageRangeArray.join(',');
    this.filter.age = ageRangeString;
    this.getFootMateList();
  }

  onChangeFoot(event: any) {
    let strongFoot: any = event.source.value;
    if (event.checked) {
      this.checkStrongFootFilters = undefined;
      if (!this.strongFootArray.includes(strongFoot)) {
        this.strongFootArray.push(strongFoot);
      }
    } else {
      this.strongFootArray.forEach((element: any, index) => {
        if (element == strongFoot) {
          this.strongFootArray.splice(index, 1);
        }
      });
    }
    let strontFootString = this.strongFootArray.join(',');
    this.filter.strong_foot = strontFootString;
    console.log(strontFootString);
    this.getFootMateList();
  }

  updatePage(event: any) {
    this.pageNo = event.selectedPage;
    this.filter.page_no = this.pageNo;
    this.getFootMateList();
  }

  getConnectionStats(data: object) {
    this.foot_data = data;
  }
  ngOnDestroy() {}
}
