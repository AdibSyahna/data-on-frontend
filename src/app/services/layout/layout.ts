import { Injectable, NgZone, signal, WritableSignal } from '@angular/core';
import { debounceTime, fromEvent } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Layout {
  public readonly mode: WritableSignal<string> = signal<'desktop' | 'mobile'>('desktop');
  public readonly overlay: WritableSignal<boolean> = signal<boolean>(false);
  public overlay_message: string = "Loading...";

  public constructor(private zone: NgZone) {
    this.zone.runOutsideAngular(() => {
      fromEvent(window, 'resize')
        .pipe(debounceTime(100))
        .subscribe(() => this.onResize());
    });

    // run once at start
    this.onResize();
  }

  private onResize() {
    const width = window.innerWidth;

    if (width < 900 && this.mode() === 'desktop') {
      this.phoneMode();
    } else if (width >= 900 && this.mode() === 'mobile') {
      this.desktopMode();
    }
  }

  public toggleOverlay(toggle: boolean, message?: string) {
    this.overlay.set(toggle);
    if (message) this.overlay_message = message;
  }

  public phoneMode() {
    this.mode.set('mobile');
  }

  public desktopMode() {
    this.mode.set('desktop');
  }
}
