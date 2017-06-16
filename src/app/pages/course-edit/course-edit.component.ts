import {Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'course-edit',
  templateUrl: './course-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CourseEditComponent implements OnInit {
  private title: String;

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
}
