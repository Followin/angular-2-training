import {Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges} from "@angular/core";

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
})
export default class PaginationComponent implements OnInit, OnChanges {
  private pages: number[];

  @Input() public totalPages: number = 0;
  @Input() public currentPage: number = 1;
  @Output() public onChange = new EventEmitter<number>();

  public ngOnInit(): void {
    this.initPages();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.initPages();
  }

  private initPages() {
    this.pages = Array.apply(null, Array(+this.totalPages)).map((_: any, i: number) => i + 1);
  }

  private goTo(page: number) {
    this.currentPage = page;
    this.onChange.emit(page);
  }
}