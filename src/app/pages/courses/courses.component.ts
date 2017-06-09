import {Component, ChangeDetectionStrategy} from '@angular/core';
import Course from '../../models/course';
import CourseService from '../../services/course.service';
import LoaderService from '../../services/loader.service';
import swal from 'sweetalert2';
import {Observable} from 'rxjs';

@Component({
  selector: 'courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CoursesComponent {
  private courses: Observable<Course[]>;
  private filter: string;

  constructor(
    private courseService: CourseService,
    private loaderService: LoaderService,
  ) { }

  public ngOnInit() {
    this.courses = this.courseService.get();
  }

  private search() {
    console.log(this.filter);
  }

  private deleteCourse(id: number) {
    swal({
      title: 'Are you sure?',
      text: 'Do you really want to delete this course?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then(() => {
      this.loaderService.show();
      setTimeout(() => {
        this.courseService.remove(id);
        this.loaderService.hide();
      }, 2000);
    }, dismiss => {
      if (dismiss === 'cancel') {
        swal(
          'Cancelled',
          'Saved!',
          'error',
        );
      }
    });
  }
}
