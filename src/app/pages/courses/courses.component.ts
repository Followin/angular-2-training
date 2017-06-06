import { Component } from '@angular/core';
import Course from '../../models/course';
import CourseService from '../../services/course.service';
import swal from 'sweetalert2';

@Component({
  selector: 'courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export default class CoursesComponent {
  private courses: Course[];
  private filter: string;

  constructor(
    private courseService: CourseService,
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
      this.courseService.remove(id);
      this.courses = this.courseService.get();

      swal(
        'Deleted!',
        'Course has been deleted',
        'success',
      );
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
