import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MutualFootmateComponent } from '@app/manage-footmates/mutual-footmate/mutual-footmate.component';
import { FootMatesService } from '@app/manage-footmates/foot-mates/foot-mates.service';
import { untilDestroyed } from '@app/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { FootRequestService } from '@app/manage-footmates/foot-request/foot-request.service';

interface FootMatesContext {
  name: string;
  position: string;
  player_type: string;
  avatar: string;
  user_id: string;
  mutuals: number;
}

interface ActiveClass {
  activePosition: boolean;
  activePlayerCategory: boolean;
  activeAge: boolean;
  activeLocation: boolean;
  activeStrongFoot: boolean;
}

interface LocationRangeFilters {
  countryData: any[];
  positions: any[];
  playerType: any[];
  ageRange: any[];
  strongFoot: any[];
  states: any[];
  cities: any[];
  positionsArray: any[];
  playerTypeArray: any[];
  ageRangeArray: any[];
  strongFootArray: any[];
}

interface LocationsIds {
  countryID: string;
  stateID: string;
  countryValue: string;
  stateValue: string;
  cityValue: string;
}

@Component({
  selector: 'app-footmates',
  templateUrl: './foot-mates.component.html',
  styleUrls: ['./foot-mates.component.scss']
})
export class FootMatesComponent implements OnInit, OnDestroy {
  filter: any = {};
  switchClass: ActiveClass;
  locationRangeFilters: LocationRangeFilters;
  locationData: LocationsIds;
  checkFilters: boolean | undefined = undefined;
  public active: boolean;

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
  pageNo: number = 1;
  show_count: number = 0;

  footMatesList: FootMatesContext[] = [];
  constructor(
    public dialog: MatDialog,
    private footMatesService: FootMatesService,
    private toastrService: ToastrService
  ) {}

  ngOnDestroy() {}

  // MatualFootmates
  openDialog(foot_mate: any): void {
    const dialogRef = this.dialog.open(MutualFootmateComponent, {
      width: '40%',
      panelClass: 'MatualFootmate',
      data: { id: foot_mate.user_id }
    });
  }

  ngOnInit() {
    this.initialize();
    this.filter.page_size = this.pageSize;
    this.filter.page_no = 1;
    this.deactivateAll();
    this.getLocationStats();
    this.getFootMateList(this.pageSize, 1);
    this.getConnectionStats({});
  }

  initialize() {
    this.locationRangeFilters = {
      countryData: [],
      positions: [],
      playerType: [],
      ageRange: [],
      strongFoot: [],
      states: [],
      cities: [],
      positionsArray: [],
      playerTypeArray: [],
      ageRangeArray: [],
      strongFootArray: []
    };
    this.locationData = {
      countryID: '',
      stateID: '',
      countryValue: '',
      stateValue: '',
      cityValue: ''
    };
    this.setDefaultValues();
  }

  setDefaultValues() {
    this.locationRangeFilters.strongFoot = [
      {
        name: 'Left',
        value: 'left'
      },
      {
        name: 'Right',
        value: 'right'
      }
    ];

    this.locationRangeFilters.ageRange = [
      {
        name: '6-12',
        value: '6-12'
      },
      {
        name: '13-26',
        value: '13-26'
      },
      {
        name: '27-38',
        value: '27-38'
      },
      {
        name: '39-50',
        value: '39-50'
      }
    ];

    this.locationRangeFilters.playerType = [
      {
        name: 'Grassroot',
        value: 'Grassroot'
      },
      {
        name: 'Amateur',
        value: 'Amateur'
      },
      {
        name: 'Professional',
        value: 'Professional'
      }
    ];
    this.getPositionsListing();
  }

  getLocationStats() {
    this.footMatesService
      .getLocationStats()
      .pipe(untilDestroyed(this))
      .subscribe(
        (response: any) => {
          this.locationRangeFilters.countryData = response.data;
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
          this.locationRangeFilters.cities = response.data.records;
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
          this.locationRangeFilters.states = response.data.records;
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
          this.locationRangeFilters.positions = response.data.records;
        },
        error => {
          this.toastrService.error('Error', error.error.message);
        }
      );
  }

  getFootMateList(page_size: number, page_no: number) {
    this.footMatesService
      .getFootMateList({ page_size, page_no, ...this.filter })
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          let records = response.data.records;
          for (let i = 0; i < records.length; i++) {
            records[i]['avatar'] = environment.mediaUrl + records[i]['avatar'];
          }
          this.footMatesList = records;
          this.show_count = response.data.records.length;
          this.foot_data.footmates = response.data.total;
        },
        error => {}
      );
  }

  onSelectCountry(event: any) {
    if (event.target.value) {
      let countryData = JSON.parse(event.target.value);
      this.locationData.countryID = countryData.country_id;
      this.getStatesListing(this.locationData.countryID);
      this.filter.country = countryData.country;
    } else {
      this.locationRangeFilters.cities = [];
      this.locationRangeFilters.states = [];
      delete this.filter.country;
      delete this.filter.state;
      delete this.filter.city;
    }
    this.filter.page_no = 1;
    this.getFootMateList(this.pageSize, 1);
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
      this.locationData.stateID = stateData.id;
      this.getCitiesListing(
        this.locationData.countryID,
        this.locationData.stateID
      );
      this.filter.state = stateData.name;
    } else {
      this.locationRangeFilters.cities = [];
      delete this.filter.state;
    }
    this.filter.page_no = 1;
    this.getFootMateList(this.pageSize, 1);
  }

  onSelectCity(event: any) {
    if (event.target.value) {
      let cityData = JSON.parse(event.target.value);
      this.filter.city = cityData.name;
    } else {
      delete this.filter.city;
    }
    this.filter.page_no = 1;
    this.getFootMateList(this.pageSize, 1);
  }

  clearFilters() {
    this.filter = {};
    this.filter.page_size = this.pageSize;
    this.filter.page_no = 1;
    this.getFootMateList(this.pageSize, 1);
    this.deactivateAll();
    this.checkFilters = false;
    this.locationRangeFilters.positionsArray = [];
    this.locationRangeFilters.playerTypeArray = [];
    this.locationRangeFilters.ageRangeArray = [];
    this.locationRangeFilters.strongFootArray = [];
    this.locationData.countryValue = '';
    this.locationData.stateValue = '';
    this.locationData.cityValue = '';
  }

  onChangeChecker(event: any, filterArray: any, type: string) {
    let entityName: any = event.source.value;
    if (event.checked) {
      if (this.checkFilters === false) this.checkFilters = undefined;
      if (!filterArray.includes(entityName)) {
        filterArray.push(entityName);
      }
    } else {
      filterArray.forEach((element: any, index: number) => {
        if (element == entityName) {
          filterArray.splice(index, 1);
        }
      });
    }
    this.filter[type] = filterArray.join(',');
    this.filter.page_no = 1;
    this.getFootMateList(this.pageSize, 1);
  }

  updatePage(event: any) {
    this.pageNo = event.selectedPage;
    this.filter.page_no = this.pageNo;
    this.getFootMateList(this.pageSize, 1);
  }

  getConnectionStats(data: object) {
    this.foot_data = data;
  }

  addActiveClass(className: any) {
    this.deactivateAll();
    this.switchClass[className] = true;
  }
  deactivateAll() {
    this.switchClass = {
      activePosition: false,
      activePlayerCategory: false,
      activeAge: false,
      activeLocation: false,
      activeStrongFoot: false
    };
  }
}
