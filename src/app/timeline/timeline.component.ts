import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { PostPopupComponent } from '@app/timeline/post-popup/post-popup.component';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { PanelOptions } from '@app/shared/models/panel-options.model';
import { TimelineService } from './timeline.service';
import { ToastrService } from 'ngx-toastr';
import { untilDestroyed } from '@app/core';
import { DeleteConfirmationComponent } from '@app/shared/dialog-box/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  environment = environment;
  postListing: any[] = [];
  pageNo: number = 1;
  pageSize: number = 5;
  panelOptions: Partial<PanelOptions> = {
    bio: true,
    member_type: true,
    my_achievements: true,
    view_profile_link: true,
    player_type: true
  };

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    dots: false,
    margin: 10,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    }
  };
  constructor(
    public dialog: MatDialog,
    private service: TimelineService,
    private toastrService: ToastrService
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(PostPopupComponent, {
      width: '40%',
      panelClass: 'postpopup'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.getPostListing();
      }
    });
  }

  ngOnInit() {
    this.getPostListing();
  }
  getPostListing(scrolled?: string) {
    if (!scrolled) {
      this.pageNo = 1;
    }
    this.service
      .getPostListing({ page_no: this.pageNo, page_size: this.pageSize })
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          console.log(response);
          let records: any[] = response.data.records;
          records.forEach((element: any) => {
            if (element.posted_by.avatar) {
              element.posted_by.avatar =
                environment.mediaUrl + element.posted_by.avatar;
            }
            if (element.post.media_url) {
              element.post.media_url =
                environment.mediaUrl + element.post.media_url;
            }
          });
          if (!scrolled) {
            this.postListing = records;
          } else {
            records.forEach((el: any) => {
              if (!this.postListing.includes(el)) {
                this.postListing.push(el);
              }
            });
          }
        },
        error => {
          this.toastrService.error('Error', error.error.message);
        }
      );
  }

  editPost(post: any) {
    const dialogRef = this.dialog.open(PostPopupComponent, {
      width: '40%',
      panelClass: 'postpopup',
      data: post
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.getPostListing();
      }
    });
  }

  deletePost(post_id: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '50% ',
      panelClass: 'filterDialog',
      data: {
        header: 'Delete Post',
        message: 'Are you sure you want to delete this post?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.service
          .deletePost(post_id)
          .pipe(untilDestroyed(this))
          .subscribe(
            response => {
              this.toastrService.success(
                `Success`,
                'Post deleted successfully'
              );
              this.getPostListing();
            },
            error => {
              this.toastrService.error(`${error.error.message}`, 'Delete Post');
            }
          );
      }
    });
  }

  onScrollDown() {
    console.log('Scrolled Down');
    this.pageNo++;
    this.getPostListing('scrolled');
  }

  onScrollUp() {
    console.log('Scrolled Up');
  }

  ngOnDestroy() {}
}
