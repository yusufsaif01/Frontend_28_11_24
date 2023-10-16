import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import Player from '@vimeo/player';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
  @Input() source: string;
  @Input() postId: string;
  @Input() status: string;

  private player: Player;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.vimeoPlayer();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.vimeoPlayer();
  }

  vimeoPlayer() {
    if (this.status === 'published') {
      let videoId = parseInt(
        this.source.split('/').find(num => !!parseInt(num))
      );
      console.log(videoId, 'videoId1');
      // let videoId1: number = 837480403;
      if (!this.player) {
        setTimeout(() => {
          this.player = new Player(`vimeo-video-player-${this.postId}`, {
            id: videoId
            // url: 'https://player.vimeo.com/video/837480403?h=f6f5e5bc0d'
            // url: 'https://player.vimeo.com/video/837480403'
          });
        }, 1000);
      } else if (videoId && this.player) {
        this.player.loadVideo(videoId);
        //   this.player.loadVideo(
        //     'https://player.vimeo.com/video/837480403?h=f6f5e5bc0d'
        //  );

        //   this.player.loadVideo(videoId).then(function(videoId:number) {
        //     // the video successfully loaded
        // }).catch(function(error:any) {
        //     switch (error.name) {
        //         case 'TypeError':
        //             console.log(" the id was not a number")
        //             break;

        //         case 'PasswordError':
        //             console.log(" the video is password-protected and the viewer needs to enter the password first")
        //             break;

        //         case 'PrivacyError':
        //           console.log(" the video is password-protected or private")
        //             break;

        //         default:
        //             console.log(" some other error occurred")
        //             break;
        //     }
        // });
      }
    }
  }
}

//"https://player.vimeo.com/video/837480403?h=f6f5e5bc0d"
