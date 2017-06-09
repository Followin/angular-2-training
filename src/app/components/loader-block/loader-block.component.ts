import { Component, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import LoaderService from '../../services/loader.service';

@Component({
  selector: 'loader-block',
  styleUrls: ['./loader-block.component.styl'],
  templateUrl: './loader-block.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoaderBlockComponent {
  private isShown: boolean;

  constructor(loaderService: LoaderService, ref: ChangeDetectorRef) {
    loaderService.isShown.subscribe((value) => {
      this.isShown = value;
      ref.markForCheck();
    });
  }
}