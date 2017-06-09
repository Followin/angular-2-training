import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import Course from '../../models/course';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CourseComponent {
  @Input() public course: Course;

  @Output() public onDelete = new EventEmitter<number>();

  private deleteCourse() {
    this.onDelete.emit(this.course.id);
  }
}
