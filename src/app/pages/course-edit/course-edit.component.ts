import {Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'course-edit',
  templateUrl: './course-edit.component.html',
})
export default class CourseEditComponent implements OnInit {
  private title: String;
  private data: Date;
  private data2: string = '';

  constructor(
    private ref: ChangeDetectorRef,
    private route: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.title = id ? `Update ${id}` : 'Create';

      this.ref.markForCheck();
    });
  }

  dateChanged(value: any) {
    console.log(value);
  }
}
