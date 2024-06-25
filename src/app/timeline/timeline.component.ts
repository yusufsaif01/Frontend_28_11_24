import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from '@env/environment';
import { MatDialog } from '@angular/material/dialog';
import { PostPopupComponent } from '@app/timeline/post-popup/post-popup.component';
import { MsgPopupComponent } from '@app/timeline/msg-popup/msg-popup.component';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { PanelOptions } from '@app/shared/models/panel-options.model';
import { TimelineService } from './timeline.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { untilDestroyed } from '@app/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { wordCount } from '@app/shared/validators/wordCount';
import { DeleteConfirmationComponent } from '@app/shared/dialog-box/delete-confirmation/delete-confirmation.component';
import { VideoPopupComponent } from './video-popup/video-popup.component';
import { ClipboardService } from 'ngx-clipboard';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
interface PostContext {
  id: string;
  caption: string;
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
  is_liked: boolean;
  likes: number;
  comments: {
    total: number;
    data: {
      comment: string;
      commented_by: {
        avatar: string;
        member_type: string;
        user_id: string;
        name: string;
        type: string;
        position: string;
      };
      commented_at: string;
    }[];
  };

  created_at: string;
  show_comment_box?: boolean;
  attributeListing?: [];
  player_list?: [];
  commentListing?: CommentContext[];
  commentForm?: FormGroup;
  commentPageNo?: number;
  commentPageSize?: number;
  addComment$?: Observable<any>;
  like$?: Observable<any>;
}

interface CommentContext {
  comment: string;
  commented_by: {
    avatar: string;
    member_type: string;
    user_id: string;
    name: string;
    type: string;
    position: string;
  };
  commented_at: string;
}

interface attendaceContext {
  user_id: string;
  lat: number;
  long: number;
}

interface PlayerListingContext {
  name: string;
  email: string;
  avatar_url: string;
  user_id: string;
  account_status: string;
  is_email_verified: string;
  position: string;
  status: string;
  type: string;
}

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit, OnDestroy {
  sidebar: boolean = false;
  environment = environment;
  postListing: PostContext[] = [];
  //playerListing:PlayerListingContext[]=[];
  show = false;
  visible = false;
  visible1 = false;
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
    pullDrag: false,
    autoplay: true,
    dots: false,
    nav: true,
    margin: 10,
    navText: [
      '<span class= "material-icons">keyboard_arrow_left</span>',
      '<span class= "material-icons">keyboard_arrow_right</span>'
    ],
    navSpeed: 700,

    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    }
  };

  is_following = false;
  is_footmate = 'Not_footmate';

  player_type: string;
  member_type: string;
  profile_status: string;
  avatar_url: string = '';
  userId: string = '';
  postCount: number = 0;
  filterValues: any = {};
  searchText = '';

  selectedPage: number;
  players_count: number;
  grassroot_count: number;
  amateur_count: number;
  proff_count: number;
  show_count: number;
  user_id: string;
  is_public: boolean;

  constructor(
    public dialog: MatDialog,

    private _timelineService: TimelineService,
    private _toastrService: ToastrService,
    private _clipboardService: ClipboardService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this._activatedRoute.params.subscribe(param => {
      if (param.user_id) {
        this.user_id = param.user_id;
        this.is_public = true;
      } else {
        this.is_public = false;
      }
    });
  }

  ngOnDestroy() {}

  getMemberType(value: string) {
    this.member_type = value;
  }

  getPlayerType(value: string) {
    this.player_type = value;
  }

  getProfileStatus(value: string) {
    this.profile_status = value;
  }

  createCommentForm(post: PostContext) {
    post.commentForm = this._formBuilder.group({
      comment: ['', [Validators.required, wordCount]]
    });
  }

  addComment(post: PostContext) {
    post.addComment$ = this._timelineService
      .addComment({
        post_id: post.id,
        ...post.commentForm.value
      })
      .pipe(
        map(resp => {
          post.commentForm.reset();
          post.comments.total++;
          let isViewedMore: boolean = post.commentPageNo > 1;
          if (isViewedMore) post.commentPageNo = 1;
          this.getCommentListing(post, false);
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
      panelClass: 'postpopup'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.getPostListing();
      }
    });
  }

  openDialogformsg(): void {
    const dialogRef = this.dialog.open(MsgPopupComponent, {
      panelClass: 'postpopup'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.getPostListing();
      }
    });
  }

  ngOnInit() {
    const check = localStorage.getItem('first_time');
    this.getPostListing();
    if (check == 'true') {
      this.openDialogformsg();
      localStorage.removeItem('first_time');
    }

    //this.getPlayerList(this.pageSize, 1);
    this.userId = localStorage.getItem('user_id');
    this.avatar_url = localStorage.getItem('avatar_url');
  }

  activateCommentBox(post: PostContext) {
    post.show_comment_box = true;
  }

  getCommentListing(post: PostContext, shouldLoad?: boolean) {
    this._timelineService
      .getCommentListing({
        page_no: post.commentPageNo,
        page_size: post.commentPageSize,
        post_id: post.id
      })
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          let comments: CommentContext[] = response.data.records;
          comments.forEach(comment => {
            if (comment.commented_by.avatar) {
              comment.commented_by.avatar =
                environment.mediaUrl + comment.commented_by.avatar;
            }
          });
          if (!shouldLoad) {
            post.commentListing = comments;
          } else {
            post.commentListing.reverse();
            comments.forEach(comment => {
              if (!post.commentListing.includes(comment)) {
                post.commentListing.push(comment);
              }
            });
          }
          post.commentListing.reverse();
        },
        error => {
          this._toastrService.error('Error', error.error.message);
        }
      );
  }

  markAttendance(post: attendaceContext) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        if (position) {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          const user_id = localStorage.getItem('user_id');
          console.log(user_id);
          console.log(lat);
          console.log(long);

          this._timelineService
            .getAttendance({
              user_id: user_id,
              lat: lat,
              long: long
            })
            .pipe(untilDestroyed(this))
            .subscribe(
              response => {
                console.log(response);
              },
              error => {
                this._toastrService.error('Error', error.error.message);
              }
            );
        }
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
  toggleLike(post: PostContext) {
    if (post.is_liked) {
      post.like$ = this._timelineService.unlikePost({ post_id: post.id }).pipe(
        map(resp => {
          post.is_liked = false;
          post.likes--;
        }),
        catchError(err => {
          this._toastrService.error('Error', err.error.message);
          throw err;
        }),
        untilDestroyed(this)
      );
    } else {
      post.like$ = this._timelineService.likePost({ post_id: post.id }).pipe(
        map(resp => {
          post.is_liked = true;
          post.likes++;
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
      .getPostListing({
        page_no: this.pageNo,
        page_size: this.pageSize,
        comments: 1
      })
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          let posts: PostContext[] = response.data.records;
          const captionIs = response.data.records.map(item => item.caption);
          console.log('captionIs issssssssssss', captionIs);
          this.postCount = response.data.records.length;
          posts.forEach(post => {
            if (post.posted_by.avatar) {
              post.posted_by.avatar =
                environment.mediaUrl + post.posted_by.avatar;
            }
            if (post.post.media_url) {
              post.post.media_url = post.post.media_url;
            }
            post.commentPageNo = 1;
            post.commentPageSize = 3;
            post.commentListing = [];
            let comments: CommentContext[] = post.comments.data;
            comments.forEach(comment => {
              if (comment.commented_by.avatar) {
                comment.commented_by.avatar =
                  environment.mediaUrl + comment.commented_by.avatar;
              }
            });
            post.commentListing = comments;
            post.commentListing.reverse();
            // this.getCommentListing(post, false, false);
            let commentForm: FormGroup;
            post.commentForm = commentForm;
            this.createCommentForm(post);

            if (post.post.media_type === 'video')
              post.attributeListing = this.generateHashtags(post.post.meta);
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
        },
        error => {
          this._toastrService.error('Error', error.error.message);
        }
      );
  }

  generateHashtags(postmeta: any) {
    let hashtags: any = [];
    if (postmeta.abilities) {
      postmeta.abilities.map((d: any) => {
        d.attributes.map((at: any) => {
          hashtags.push(at.attribute_name);
        });
      });
    }
    if (postmeta.others) {
      postmeta.others.map((d: any) => {
        hashtags.push(d);
      });
    }
    return hashtags;
  }

  editPost(post: any) {
    const dialogRef = this.dialog.open(PostPopupComponent, {
      panelClass: 'postpopup',
      data: post
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.getPostListing();
      }
    });
  }

  editVideoPost(post: any) {
    let member_type = this.member_type;
    const dialogRef = this.dialog.open(VideoPopupComponent, {
      panelClass: 'videopopup',
      data: { ...post, member_type }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.getPostListing();
      }
    });
  }

  deletePost(post_id: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      panelClass: 'deletepopup',
      data: {
        message: 'Are you sure you want to delete?'
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
                'Delete post'
              );
            }
          );
      }
    });
  }

  loadComments(post: PostContext) {
    if (post.comments.total === post.commentListing.length) return;
    post.commentPageNo++;
    this.getCommentListing(post, true);
  }

  onScrollDown() {
    console.log('Scrolled Down');
    if (this.postCount === this.pageSize) {
      this.pageNo++;
      console.log('inside equal to match');
      console.log('Now page size is');
      console.log(this.pageNo++);
      this.getPostListing('scrolled');
    }
  }

  onScrollUp() {
    console.log('Scrolled Up');
  }
  // toggle sidebar on mobile

  // Video Popup
  openVideoDialog(): void {
    let data = {
      member_type: this.member_type,
      profile_status: this.profile_status
    };
    const dialogRef = this.dialog.open(VideoPopupComponent, {
      panelClass: 'videopopup',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.getPostListing();
      }
    });
  }

  //Get Player List

  openPublicProfile(user_id: string) {
    this._router.navigate([]).then(result => {
      window.open(`/member/profile/public/${user_id}`, '_blank');
    });
  }

  toggleFootMate(user_id: string) {
    if (this.is_footmate === 'Not_footmate') {
      this._timelineService
        .sendFootMate({
          to: user_id
        })
        .pipe(untilDestroyed(this))
        .subscribe(
          response => {
            this.is_footmate = 'Pending';
          },
          error => {
            this._toastrService.error('Error', error.error.message);
          }
        );
    }
  }

  //End of Player List

  copyToClipboard(videoId: string) {
    let url = environment.mediaUrl + '/member/gallery/gallery-view/' + videoId;
    this._clipboardService.copyFromContent(url);
    this._toastrService.success('Success', 'Link copied to clipboard');
  }
}
