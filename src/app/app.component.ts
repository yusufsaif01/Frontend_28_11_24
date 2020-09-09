import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { environment } from '@env/environment';
import { Logger, I18nService, untilDestroyed } from '@app/core';
import { TimelineService } from '@app/timeline/timeline.service';
import { SharedService } from '@app/shared/shared.service';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
const log = new Logger('App');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  videoRequest: any;
  uploader: boolean;
  loggedIn: boolean;
  file: any;

  constructor(
    private titleService: Title,
    private i18nService: I18nService,
    private _timelineService: TimelineService,
    private _sharedService: SharedService,
    private _toastrService: ToastrService,
    private _store: Store<any>,
    private router: Router
  ) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        var title = this.getTitle(
          router.routerState,
          router.routerState.root
        ).join('-');
        this.titleService.setTitle(title);
        window.scrollTo(0, 0);
        // if (router.navigated && !this.uploader) alert('Hello world');
      }
    });

    _store.select('uploader').subscribe(uploader => {
      this.uploader = uploader.data;
    });
  }

  ngOnInit() {
    // Setup logger
    if (environment.production) {
      Logger.enableProductionMode();
    }

    log.debug('init');

    // Setup translations
    this.i18nService.init(
      environment.defaultLanguage,
      environment.supportedLanguages
    );

    this._sharedService.sharedMessage.subscribe(requestData => {
      if (requestData) {
        this.videoRequest = requestData;
        this.triggerUpload(this.videoRequest.requestData.get('media'));
      }
    });
  }
  // collect that title data properties from all child routes
  getTitle(state: any, parent: any): any {
    let data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(...this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }

  triggerUpload(file: any) {
    this.file = {
      data: file,
      progress: 0,
      inProgress: true,
      error: ''
    };

    this.dispatcher('PENDING_UPLOAD');
    this._timelineService
      .createVideoPost(this.videoRequest)
      .pipe(untilDestroyed(this))
      .pipe(
        map((event: any) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              this.file.progress = Math.round(
                (event.loaded * 100) / event.total
              );
              break;
            case HttpEventType.Response:
              return event;
          }
        })
      )
      .subscribe(
        response => {
          // if(this.file.progress == '100')
          //   this.dispatcher('PENDING_UPLOAD');

          if (response) {
            this.dispatcher('COMPLETED_UPLOAD');
            this._toastrService.success(
              'Success',
              'Video uploaded successfully'
            );
          }
        },
        error => {
          this.file.error = error.msg;
          this.dispatcher('ERROR_UPLOAD');
        }
      );
  }

  dispatcher(type: string) {
    this._store.dispatch({ type: type });
  }

  ngOnDestroy() {
    this.i18nService.destroy();
  }
}
