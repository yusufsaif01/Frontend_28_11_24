import { Component, OnInit, Input } from '@angular/core';
import { Constants } from '@app/shared/static-data/static-data';
import { SharedService } from '@app/shared/shared.service';
import { ToastrService } from 'ngx-toastr';
import { untilDestroyed } from '@app/core';
import { FilterService } from './filter.service';

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

interface ShowFilterList {}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  filter: any = {};
  switchClass: ActiveClass;
  locationRangeFilters: LocationRangeFilters;
  locationData: LocationsIds;
  checkFilters: boolean | undefined = undefined;
  @Input() showFilerList: ShowFilterList;

  constructor(
    private toastrService: ToastrService,
    private sharedService: SharedService,
    private filterService: FilterService
  ) {}

  ngOnInit() {
    this.initialize();
    this.deactivateAll();
    this.getLocationStats();
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
    this.locationRangeFilters.strongFoot = Constants.STRONG_FOOT;
    this.locationRangeFilters.ageRange = Constants.AGE_RANGE;
    this.locationRangeFilters.playerType = Constants.PLAYER_TYPE;
    this.getPositionsListing();
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
    // this.getFootMateList(this.pageSize, 1);
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
    // this.getFootMateList(this.pageSize, 1);
  }

  onSelectCity(event: any) {
    if (event.target.value) {
      let cityData = JSON.parse(event.target.value);
      this.filter.city = cityData.name;
    } else {
      delete this.filter.city;
    }
    this.filter.page_no = 1;
    // this.getFootMateList(this.pageSize, 1);
  }

  getLocationStats() {
    this.sharedService
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

  getStatesListing(countryID: string) {
    this.sharedService
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

  getCitiesListing(countryID: string, stateID: string) {
    this.sharedService
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

  addActiveClass(className: any) {
    this.deactivateAll();
    this.switchClass[className] = true;
  }

  ngOnDestroy() {}

  getPositionsListing() {
    this.filterService
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
    // this.getFootMateList(this.pageSize, 1);
  }

  clearFilters() {
    this.filter = {};
    this.filter.page_no = 1;
    this.deactivateAll();
    this.checkFilters = false;
    this.locationRangeFilters.positionsArray = [];
    this.locationRangeFilters.playerTypeArray = [];
    this.locationRangeFilters.ageRangeArray = [];
    this.locationRangeFilters.strongFootArray = [];
    this.locationData.countryValue = '';
    this.locationData.stateValue = '';
    this.locationData.cityValue = '';
    // this.getFootMateList(this.pageSize, 1);
  }
}
