import { Component, OnInit } from '@angular/core';
import { SharedService } from '@app/shared/shared.service';
@Component({
  selector: 'app-gallery-listing',
  templateUrl: './gallery-listing.component.html',
  styleUrls: ['./gallery-listing.component.scss']
})
export class GalleryListingComponent implements OnInit {
  constructor(private _sharedService: SharedService) {}

  filtersList = {
    position: false,
    playerCategory: false,
    age: false,
    location: false,
    strongFoot: false,
    teamTypes: false,
    ability: false,
    status: false,
    phyiscal: true,
    mental: true,
    technical: true,
    goalkeeping: true,
    otherability: true
  };

  openFilter() {
    this._sharedService.setFilterDisplayValue(true);
  }
  ngOnInit() {}
}
