import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  QueryList,
  ViewChildren,
  Renderer2,
  ElementRef
} from '@angular/core';
import { Constants } from '@app/shared/static-data/static-data';
import { SharedService } from '@app/shared/shared.service';
import { ToastrService } from 'ngx-toastr';
import { untilDestroyed } from '@app/core';
import { FilterService } from './filter.service';
import { AdminService } from '@app/admin/admin.service';

interface LocationRangeFilters {
  countryData: any[];
  positions: any[];
  playerType: any[];
  ageRange: any[];
  strongFoot: any[];
  states: any[];
  districts: any[];
  teamTypes: any[];
  status: any[];
  ability: any[];
  positionsArray: any[];
  playerTypeArray: any[];
  ageRangeArray: any[];
  strongFootArray: any[];
  teamTypesArray: any[];
  statusArray: any[];
  abilityArray: any[];
  dateRange: {
    to: any;
    from: any;
  };
  clubAcademyName: string;
  reportStatus: any[];
  reportStatusArray: any[];
  createdBy: any[];
  createdByArray: any[];
  attribute: any[];
  attributeArray: any[];
  otherTags: any[];
  otherTagsArray: any[];
}

interface LocationsIds {
  countryID: string;
  stateID: string;
  countryValue: string;
  stateValue: string;
  districtValue: string;
}

interface TagContext {
  ability: string;
  ability_name: string;
  attributes: {
    attribute: string;
    attribute_name: string;
    attribute_value?: boolean;
  }[];
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  filter: any = {};
  tagsArray: TagContext[] = [];
  locationRangeFilters: LocationRangeFilters;
  locationData: LocationsIds;
  today = new Date();
  tzoffset = new Date().getTimezoneOffset() * 60000;
  @Input() filterHeading = 'Player filter';
  @Input() allowedFilters = {
    position: false,
    playerCategory: false,
    age: false,
    location: false,
    strongFoot: false,
    teamTypes: false,
    ability: false,
    status: false,
    dateRange: false,
    clubAcademyName: false,
    createdBy: false,
    reportStatus: false,
    abilityAttribute: false,
    otherTags: false
  };
  showFilter = false;

  @Output() filterChanges: EventEmitter<any> = new EventEmitter();
  @ViewChildren(
    'position, playercategory, age, location, strongfoot, ability, teamtype, status, daterange, reportstatus, clubacademyname, createdby, abilityattribute, othertags'
  )
  templates: QueryList<ElementRef>;

  constructor(
    private _toastrService: ToastrService,
    private _sharedService: SharedService,
    private _filterService: FilterService,
    private _adminService: AdminService,
    private _renderer: Renderer2
  ) {}

  ngOnInit() {
    this.initialize();
    this.getLocationStats();
    this.getAbilityList();
    this.getFilterDisplayValue();
    if (this.allowedFilters.abilityAttribute) this.getAbilityAttributeList();
  }

  toggleFilter(filter: string) {
    let el = this.templates
      .map((element, index) => {
        return element.nativeElement.classList.contains(`${filter}-filter`)
          ? element
          : null;
      })
      .filter(element => {
        return element != null;
      });

    let element = el[0].nativeElement;
    element.classList.contains('remove-filter')
      ? this._renderer['removeClass'](element, 'remove-filter')
      : this._renderer['addClass'](element, 'remove-filter');
  }

  getFilterDisplayValue() {
    this._sharedService
      .getFilterDisplayValue()
      .pipe(untilDestroyed(this))
      .subscribe(value => {
        this.showFilter = value;
      });
  }

  closeFilter() {
    this._sharedService.setFilterDisplayValue(false);
    this.getFilterDisplayValue();
  }

  getAbilityList() {
    this._adminService
      .getAbilityList()
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          let records = response.data.records;
          this.locationRangeFilters.ability = records;
        },
        error => {
          this._toastrService.error(error.error.message, 'Error');
        }
      );
  }

  getAbilityAttributeList() {
    this._sharedService
      .getAbilityAttributeList()
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this.tagsArray = response.data.records.map(record => {
            return {
              ability: record.id,
              ability_name: record.name,
              attributes: record.attributes.length
                ? record.attributes.map(attribute => {
                    return {
                      attribute: attribute.id,
                      attribute_name: attribute.name,
                      attribute_value: false
                    };
                  })
                : []
            };
          });
        },
        error => {}
      );
  }

  initialize() {
    this.locationRangeFilters = {
      countryData: [],
      positions: [],
      playerType: [],
      ageRange: [],
      strongFoot: [],
      states: [],
      districts: [],
      teamTypes: [],
      status: [],
      reportStatus: [],
      createdBy: ['club', 'academy'],
      attribute: [],
      otherTags: ['Celebration', 'Team play', 'Press conference', 'Interviews'],
      ability: [],
      positionsArray: [],
      playerTypeArray: [],
      ageRangeArray: [],
      strongFootArray: [],
      teamTypesArray: [],
      statusArray: [],
      abilityArray: [],
      dateRange: {
        to: '',
        from: ''
      },
      clubAcademyName: '',
      reportStatusArray: [],
      createdByArray: [],
      attributeArray: [],
      otherTagsArray: []
    };
    this.locationData = {
      countryID: '',
      stateID: '',
      countryValue: '',
      stateValue: '',
      districtValue: ''
    };
    this.setDefaultValues();
  }

  setDefaultValues() {
    this.locationRangeFilters.strongFoot = Constants.STRONG_FOOT;
    this.locationRangeFilters.ageRange = Constants.AGE_RANGE;
    this.locationRangeFilters.playerType = Constants.PLAYER_TYPE;
    this.locationRangeFilters.status = Constants.STATUS;
    this.locationRangeFilters.reportStatus = Constants.REPORT_STATUS;
    if (localStorage.getItem('member_type') === 'academy') {
      this.locationRangeFilters.teamTypes = Constants.ACADEMY_TEAM_TYPES;
    }
    if (localStorage.getItem('member_type') === 'club') {
      this.locationRangeFilters.teamTypes = Constants.CLUB_TEAM_TYPES;
    }
    this.getPositionsListing();
  }

  onSelectCountry(event: any) {
    if (event.target.value) {
      let countryData = JSON.parse(event.target.value);
      this.locationData.countryID = countryData.country_id;
      this.getStatesListing(this.locationData.countryID);
      this.filter.country = countryData.country;
    } else {
      this.locationRangeFilters.districts = [];
      this.locationRangeFilters.states = [];
      delete this.filter.country;
      delete this.filter.state;
      delete this.filter.district;
    }
    this.filterChanges.emit(this.filter);
  }

  onSelectState(event: any) {
    if (event.target.value) {
      let stateData = JSON.parse(event.target.value);
      this.locationData.stateID = stateData.id;
      this.getDistrictsListing(
        this.locationData.countryID,
        this.locationData.stateID
      );
      this.filter.state = stateData.name;
    } else {
      this.locationRangeFilters.districts = [];
      delete this.filter.state;
    }
    this.filterChanges.emit(this.filter);
  }

  onSelectDistrict(event: any) {
    if (event.target.value) {
      let districtData = JSON.parse(event.target.value);
      this.filter.district = districtData.name;
    } else {
      delete this.filter.district;
    }
    this.filterChanges.emit(this.filter);
  }

  getLocationStats() {
    this._sharedService
      .getLocationStats()
      .pipe(untilDestroyed(this))
      .subscribe(
        (response: any) => {
          this.locationRangeFilters.countryData = response.data;
        },
        error => {
          this._toastrService.error('Error', error.error.message);
        }
      );
  }

  getStatesListing(countryID: string) {
    this._sharedService
      .getStatesListing(countryID)
      .pipe(untilDestroyed(this))
      .subscribe(
        (response: any) => {
          this.locationRangeFilters.states = response.data.records;
        },
        error => {
          this._toastrService.error('Error', error.error.message);
        }
      );
  }

  getDistrictsListing(countryID: string, stateID: string) {
    this._sharedService
      .getDistrictsList(countryID, stateID, { page_size: 85 })
      .pipe(untilDestroyed(this))
      .subscribe(
        (response: any) => {
          this.locationRangeFilters.districts = response.data.records;
        },
        error => {
          this._toastrService.error('Error', error.error.message);
        }
      );
  }

  ngOnDestroy() {}

  getPositionsListing() {
    this._filterService
      .getPositionsListing()
      .pipe(untilDestroyed(this))
      .subscribe(
        (response: any) => {
          this.locationRangeFilters.positions = response.data.records;
        },
        error => {
          this._toastrService.error('Error', error.error.message);
        }
      );
  }

  getLocationValue(location: any) {
    return location ? JSON.stringify(location) : '';
  }

  onChangeChecker(event: any, filterArray: any, type: string) {
    let entityName: any = event.source.value;
    if (event.checked) {
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
    this.filterChanges.emit(this.filter);
  }

  onDateChangeChecker(event: any, type: string) {
    let { dateRange } = this.locationRangeFilters;
    if (['to', 'from'].includes(type)) {
      dateRange[type] = event.target.value;
      // if (type === 'to') {
      //   dateRange[type] = new Date(dateRange[type]).setHours(23, 59, 59);
      // }
      dateRange[type] = new Date(dateRange[type] - this.tzoffset).toISOString();
    }
    if (!Object.values(dateRange).includes('')) {
      Object.keys(dateRange).forEach(range => {
        this.filter[range] = dateRange[range];
      });
      this.filterChanges.emit(this.filter);
    }
  }

  onNameChangeChecker(event: any) {
    this.filter.name = event.target.value;
    this.filterChanges.emit(this.filter);
  }

  clearFilters() {
    this.filter = {};
    this.locationRangeFilters.positionsArray = [];
    this.locationRangeFilters.playerTypeArray = [];
    this.locationRangeFilters.ageRangeArray = [];
    this.locationRangeFilters.strongFootArray = [];
    this.locationRangeFilters.statusArray = [];
    this.locationRangeFilters.reportStatusArray = [];
    this.locationRangeFilters.createdByArray = [];
    this.locationRangeFilters.attributeArray = [];
    this.locationRangeFilters.otherTagsArray = [];
    this.locationRangeFilters.teamTypesArray = [];
    this.locationRangeFilters.abilityArray = [];
    this.locationRangeFilters.dateRange = {
      to: '',
      from: ''
    };
    this.locationRangeFilters.clubAcademyName = '';
    this.locationData.countryValue = '';
    this.locationData.stateValue = '';
    this.locationData.districtValue = '';
    this.filterChanges.emit(false);

    this.templates.map((element, index) => {
      this._renderer['removeClass'](element.nativeElement, 'remove-filter');
    });
  }
}
