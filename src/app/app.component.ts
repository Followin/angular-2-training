import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import LoaderService from './services/loader.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private isLoading: boolean;

  constructor(loaderService: LoaderService, ref: ChangeDetectorRef) {
    loaderService.isShown.subscribe((value) => {
      this.isLoading = value;
      ref.markForCheck();
    });
  }
}
