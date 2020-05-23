import { Component, OnInit, Input, OnDestroy } from '@angular/core';
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
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { untilDestroyed } from '@app/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DeleteConfirmationComponent } from '@app/shared/dialog-box/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit, OnDestroy {
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

  commentForm: FormGroup;
  comment_count: number = 0;
  show_comment_box: false;
  player_type: string;
  member_type: string;

  addComment$: Observable<any>;
  likes: number = 0;

  @Input() is_like = false;

  like$: Observable<any>;
  userId: string = '';

  constructor(
    public dialog: MatDialog,
    private _timelineService: TimelineService,
    private _toastrService: ToastrService,
    private _formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnDestroy() {}

  getMemberType(value: string) {
    this.member_type = value;
  }

  getPlayerType(value: string) {
    this.player_type = value;
  }

  createForm() {
    this.commentForm = this._formBuilder.group({
      comment: [
        '',
        [
          Validators.maxLength(60),
          Validators.pattern(/^[A-Za-z0-9\(\)\-\&\!\%\* ]+$/)
        ]
      ]
    });
  }

  addComment() {
    this.addComment$ = this._timelineService
      .addComment({
        post_id: 'ffd98934-c6f5-47a7-912d-68585dc7861f', //postId
        ...this.commentForm.value
      })
      .pipe(
        map(resp => {
          this.comment_count++;
          this.commentForm.reset();
        }),
        catchError(err => {
          this._toastrService.error('Error', err.error.message);
          throw err;
        }),
        untilDestroyed(this)
      );
  }

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
    this.userId = localStorage.getItem('user_id');
  }

  toggleLike() {
    if (this.is_like) {
      this.like$ = this._timelineService
        .unlikePost({ post_id: 'ffd98934-c6f5-47a7-912d-68585dc7861f' }) //postId
        .pipe(
          map(resp => {
            this.is_like = false;
            this.likes--;
          }),
          catchError(err => {
            this._toastrService.error('Error', err.error.message);
            throw err;
          }),
          untilDestroyed(this)
        );
    } else {
      this.like$ = this._timelineService
        .likePost({ post_id: 'ffd98934-c6f5-47a7-912d-68585dc7861f' }) //postId
        .pipe(
          map(resp => {
            this.is_like = true;
            this.likes++;
          }),
          catchError(err => {
            this._toastrService.error('Error', err.error.message);
            throw err;
          }),
          untilDestroyed(this)
        );
    }
  }

  getPostListing(scrolled?: string) {
    if (!scrolled) {
      this.pageNo = 1;
    }
    this._timelineService
      .getPostListing({ page_no: this.pageNo, page_size: this.pageSize })
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          let dateNow: any = new Date(Date.now());
          let records: any[] = response.data.records;
          records.forEach((element: any) => {
            element.postDate = new Date(element.created_at);
            element.dateDiff = Math.abs(dateNow - element.postDate) / 1000;
            element.days = Math.floor(element.dateDiff / 86400);
            element.hours = Math.floor(element.dateDiff / 3600) % 24;
            element.minutes = Math.floor(element.dateDiff / 60) % 60;
            element.seconds = element.dateDiff % 60;
            element.seconds = parseInt(element.seconds);
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
          this._toastrService.error('Error', error.error.message);
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
        this._timelineService
          .deletePost(post_id)
          .pipe(untilDestroyed(this))
          .subscribe(
            response => {
              this._toastrService.success(
                `Success`,
                'Post deleted successfully'
              );
              this.getPostListing();
            },
            error => {
              this._toastrService.error(
                `${error.error.message}`,
                'Delete Post'
              );
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
}
