import { Pipe, PipeTransform } from '@angular/core';
import Course from '../models/course';

@Pipe({
  name: 'orderCoursesByCreationDate',
})
export default class OrderCoursesByCreationDatePipe implements PipeTransform {
  public transform(courses: Course[]): any {
    return courses.sort((course1, course2) => course1.createdAt.getTime() - course2.createdAt.getTime());
  }
}