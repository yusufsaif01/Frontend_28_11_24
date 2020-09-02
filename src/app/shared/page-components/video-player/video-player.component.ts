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
      if (!this.player) {
        setTimeout(() => {
          this.player = new Player(`vimeo-video-player-${this.postId}`, {
            id: videoId
          });
        }, 500);
      } else if (videoId && this.player) {
        this.player.loadVideo(videoId);
      }
    }
  }
}
