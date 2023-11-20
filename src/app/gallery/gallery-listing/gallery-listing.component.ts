import { Component, OnInit } from '@angular/core';
import {
  GalleryListingService,
  GetGalleryListContext
} from './gallery-listing.service';
import { untilDestroyed } from '@app/core';
import { environment } from '@env/environment';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '@app/shared/shared.service';
import { PanelOptions } from '@app/shared/models/panel-options.model';
import { ActivatedRoute } from '@angular/router';

export interface GetGalleryListResponseContext {
  created_at: string;
  id: string;
  media: {
    media_url: string;
    media_type: string;
    media_thumbnail: {
      sizes: {
        width: number;
        height: number;
        link: string;
        link_with_play_button: string;
      }[];
      url: string;
    };
  };
  meta?: {
    abilities: {
      ability_name: string;
      attributes: [];
    }[];
    others: [];
  };
  status: string;
  type: string;
}

interface PostContext {
  id: string;
  post: {
    text: string;
    media_url: string;
    media_type: string;
    media_thumbnail: {
      sizes: string;
    }[];
    meta?: {
      abilities: {
        ability_name: string;
        attributes: [];
      }[];
      others: [];
    };
    status?: string;
  };
  posted_by: {
    avatar: string;
    member_type: string;
    user_id: string;
    name: string;
    type: string;
    position: string;
  };
}

@Component({
  selector: 'app-gallery-listing',
  templateUrl: './gallery-listing.component.html',
  styleUrls: ['./gallery-listing.component.scss']
})
export class GalleryListingComponent implements OnInit {
  constructor(
    private _sharedService: SharedService,
    private _galleryListingService: GalleryListingService,
    private _toastrService: ToastrService,
    private _activatedRoute: ActivatedRoute //  private _timelineService: TimelineService
  ) {
    this._activatedRoute.params.subscribe(params => {
      if (params['handle']) {
        this.panelOptions.is_public = true;
        this.isPublic = true;
        this.userId = params['handle'];
      }
    });
  }
  postSize: any = 0;
  postCount: number = 0;
  postListing: PostContext[] = [];
  sidebar: boolean = false;
  filter: GetGalleryListContext = {};
  galleryList: GetGalleryListResponseContext[] = [];
  pageSize = 12;
  pageNo = 1;
  selectedPage = 1;
  show_count = 0;
  total_count = 0;
  searchText = '';
  isPublic = false;
  publicMemberType: string;
  publicFootplayer: boolean;
  member_type: string = localStorage.getItem('member_type');
  video_type: string = 'timeline';
  userId: string;

  filtersList = {
    abilityAttribute: true,
    otherTags: true
  };

  panelOptions: Partial<PanelOptions> = {
    bio: true,
    member_type: true,
    my_achievements: false,
    view_profile_link: true,
    footplayers: true,
    is_public: false
  };

  ngOnInit() {
    this.filter.page_size = this.pageSize;
    this.filter.page_no = this.pageNo;
    this.getGalleryList();
    this.getPostListing();
  }

  toggleVideoType(type: string) {
    this.filter.page_no = 1;
    this.video_type = type;
    this.getGalleryList();
  }

  openFilter() {
    this._sharedService.setFilterDisplayValue(true);
  }

  updatePage(event: any) {
    this.selectedPage = event.selectedPage;
    this.pageNo = this.selectedPage;
    this.filter.page_no = this.pageNo;
    this.getGalleryList();
  }

  getSearchText(value: string) {
    this.searchText = value;
    this.filter.search = this.searchText;
    this.filter.page_no = 1;
    this.selectedPage = 1;
    this.getGalleryList();
  }

  onChangeFilter(event: any) {
    if (event) {
      this.filter = event;
    } else {
      this.filter = {};
    }
    this.selectedPage = 1;
    this.filter.page_no = 1;
    this.filter.page_size = 10;
    this.getGalleryList();
  }

  getGalleryList() {
    if (this.isPublic) {
      this._galleryListingService
        .getPublicGalleryList(this.userId, {
          type: this.video_type,
          ...this.filter
        })
        .pipe(untilDestroyed(this))
        .subscribe(
          response => {
            this.galleryList = response.data.records;
            this.publicMemberType = response.data.posted_by.member_type;
            this.publicFootplayer = response.data.is_footplayer;
            this.show_count = response.data.records.length;
            this.total_count = response.data.total;
          },
          error => {
            this._toastrService.error(error.error.message, 'Error');
          }
        );
    } else {
      this._galleryListingService
        .getGalleryList({ type: this.video_type, ...this.filter })
        .pipe(untilDestroyed(this))
        .subscribe(
          response => {
            this.galleryList = response.data.records;
            this.show_count = response.data.records.length;
            this.total_count = response.data.total;
          },
          error => {
            this._toastrService.error(error.error.message, 'Error');
          }
        );
    }
  }

  replaceFilterProperty(searchProp: string, replaceProp: string) {
    if (this.filter.hasOwnProperty(searchProp)) {
      Object.defineProperty(
        this.filter,
        replaceProp,
        Object.getOwnPropertyDescriptor(this.filter, searchProp)
      );
      delete this.filter[searchProp];
    }
  }

  attachEnvironmentUrl(value: String) {
    return environment.mediaUrl + value;
  }
  getPostListing(scrolled?: string) {
    if (!scrolled) {
      this.pageNo = 1;
    }
    this._galleryListingService
      .getPostListing({
        page_no: this.pageNo,
        page_size: this.pageSize,
        comments: 1
      })
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          let posts: PostContext[] = response.data.records;
          this.postCount = response.data.records.length;
          posts.forEach(post => {
            if (post.posted_by.avatar) {
              post.posted_by.avatar =
                environment.mediaUrl + post.posted_by.avatar;
            }
            if (post.post.media_url) {
              post.post.media_url = environment.mediaUrl + post.post.media_url;
              console.log('%%%%%%%%%%%%%%%%%%%%');

              console.log(post.post);
            }
          });
          if (!scrolled) {
            this.postListing = posts;
          } else {
            posts.forEach(post => {
              if (!this.postListing.includes(post)) {
                this.postListing.push(post);
              }
            });
          }

          this.postSize = this.postListing.length;
        },
        error => {
          this._toastrService.error('Error', error.error.message);
        }
      );
  }

  ngOnDestroy() {}
}
