import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { environment } from '@env/environment';
import { Logger, I18nService, untilDestroyed } from '@app/core';
import { TimelineService } from '@app/timeline/timeline.service';
import { SharedService } from '@app/shared/shared.service';
import { Store } from '@ngrx/store';
const log = new Logger('App');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  message: any;
  uploader: boolean;

  constructor(
    private titleService: Title,
    private i18nService: I18nService,
    private _timelineService: TimelineService,
    private _sharedService: SharedService,
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
        if (router.navigated && !this.uploader) alert('Hello world');
      }
    });

    _store.select('uploader').subscribe(uploader => {
      this.uploader = uploader;
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

    this._sharedService.sharedMessage.subscribe(message => {
      if (message) {
        this.message = message;
        this.trigger();
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

  trigger() {
    this.dispatcher('PENDING_UPLOAD');
    this._timelineService
      .createVideoPost(this.message)
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this.dispatcher('COMPLETED_UPLOAD');
          console.log('Yes');
        },
        error => {
          console.log(error);
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
