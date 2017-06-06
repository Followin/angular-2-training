import { Component } from '@angular/core';
import Course from '../../models/course';
import CourseService from '../../services/course.service';

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
    console.log(`Removed ${id}`);
  }
}
