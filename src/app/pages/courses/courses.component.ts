import {Component, ChangeDetectionStrategy} from '@angular/core';
import Course from '../../models/course';
import CourseService from '../../services/course.service';
import LoaderService from '../../services/loader.service';
import swal from 'sweetalert2';
import {Observable} from 'rxjs';

@Component({
  selector: 'courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CoursesComponent {
  private courses: Observable<Course[]>;
  private hasCourses: boolean;
  private filter: string = '';

  constructor(
    private courseService: CourseService,
    private loaderService: LoaderService,
  ) { }

  public ngOnInit() {
    this.initCourses();

    this.courseService.get().subscribe(value => {
      this.hasCourses = !!value.length;
    });
  }

  private search() {
    this.initCourses();
  }

  private initCourses() {
    const minDate = new Date();
    minDate.setDate(minDate.getDate() - 14);

    this.courses = this.courseService.get()
      .map(courses =>
        courses.filter(course =>
          course.createdAt >= minDate
          && course.title.toLowerCase().indexOf(this.filter.toLowerCase()) > -1));
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
      }, 500);
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
