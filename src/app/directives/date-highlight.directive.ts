import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[dateHighlight]',
})
export default class DateHighlightDirective implements OnInit {
  @Input('dateHighlight') private itemDate: Date;

  constructor (private el: ElementRef) { }

  public ngOnInit(): void {
    this.setHighlight();
  }

  private setHighlight(): void {
    const currentDate = new Date();
    const furthestDate = new Date();
    furthestDate.setDate(furthestDate.getDate() - 14);

    if (this.itemDate < currentDate && this.itemDate >= furthestDate) {
      this.setFreshHighlight();
    }

    if (this.itemDate > currentDate) {
      this.setUpcomingHightlight();
    }
  }

  private setFreshHighlight() {
    this.el.nativeElement.style.borderColor = '#0288D1';
  }

  private setUpcomingHightlight() {
    this.el.nativeElement.style.borderColor = '#B3E5FC';
  }
}