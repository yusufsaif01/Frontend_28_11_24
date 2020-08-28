import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges
} from '@angular/core';
import Player from '@vimeo/player';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
  @Input() source: string = '';

  private player: Player;
  // timeWatched: number = 0;
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    // this.htmlPlayer();
    this.vimeoPlayer();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.vimeoPlayer();
  }
  // links=[]
  htmlPlayer() {
    var videoElement = document.querySelector('video');
    // let CurrentTime = 0;

    videoElement.setAttribute('controlsList', 'nodownload');

    videoElement.addEventListener(
      'error',
      function(e) {
        // if the error is caused by the video not loading
        if (this.networkState > 2) {
          // add an image with the message "video not found"
          this.setAttribute(
            'poster',
            'http://dummyimage.com/312x175/000/fff.jpg&text=Video+Not+Found'
          );
        }
      },
      true
    );
    // videoElement.addEventListener('timeupdate', e => {
    //   if (!videoElement.seeking) CurrentTime = videoElement.currentTime;
    // });
    // videoElement.addEventListener('ended', e => {
    //   //CurrentTime = 0;
    //   this.videoEnded.emit('video Ended');
    // });

    // videoElement.addEventListener('seeking', e => {
    //   var change = videoElement.currentTime - CurrentTime;
    //   if (Math.abs(change) > 0.01) {
    //     console.log('tried seeking');
    //     videoElement.currentTime = CurrentTime;
    //   }
    // });
  }

  vimeoPlayer() {
    let videoId = parseInt(this.source.split('/').find(num => !!parseInt(num)));
    if (!this.player) {
      this.player = new Player('vimeo-video-player', {
        id: videoId
      });
      // this.player.on('ended', () => {
      //   this.videoEnded.emit('video Ended');
      // });
      // // get the current watching time
      // this.player.on('timeupdate', (data: any) => {
      //   if (data.seconds - 1 < this.timeWatched && data.seconds > this.timeWatched) {
      //     this.timeWatched = data.seconds;
      //   }
      // });
      // //disable seeking
      // this.player.on('seeked', (data: any) => {
      //   if (this.timeWatched < data.seconds) {
      //     this.player.setCurrentTime(this.timeWatched);
      //   }
      // });
    } else if (videoId && this.player) {
      this.player.loadVideo(videoId);
    }
  }
}
