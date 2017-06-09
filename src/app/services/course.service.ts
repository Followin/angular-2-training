import Course from '../models/course';
import {BehaviorSubject, Observable} from 'rxjs';

export default class {
  private courses: Course[] = [{
    id: 1,
    title: 'Course 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui suscipit volutpat, egestas hymenaeos tellus... '
    + 'Ullamcorper at egestas? Hac tincidunt nostra quis at faucibus. Volutpat in erat ullamcorper, lectus velit diam fames...'
    + 'Potenti orci praesent sem auctor dictum. Sollicitudin massa primis tempor sodales...',
    duration: 5,
    createdAt: new Date(),
  }, {
    id: 2,
    title: 'Course 2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui suscipit volutpat, egestas hymenaeos tellus... '
    + 'Ullamcorper at egestas? Hac tincidunt nostra quis at faucibus. Volutpat in erat ullamcorper, lectus velit diam fames...'
    + 'Potenti orci praesent sem auctor dictum. Sollicitudin massa primis tempor sodales...',
    duration: 10,
    createdAt: new Date(),
  }];

  private coursesSubject: BehaviorSubject<Course[]> = new BehaviorSubject(this.courses);

  private lastIndex: number = 2;

  public get(): Observable<Course[]>;
  public get(id: number): Course;

  public get(id?: number): Observable<Course[]> | Course {
    if (id != null) {
      return this.courses.find(course => course.id === id);
    }

    return this.coursesSubject.asObservable();
  }

  public create(course: Course): void {
    course.id = ++this.lastIndex;
    this.courses.push(course);

    this.coursesSubject.next(this.courses);
  }

  public update(course: Course): void {
    const existingCourse = this.get(course.id);
    const index = this.courses.indexOf(existingCourse);

    this.courses[index] = course;

    this.coursesSubject.next(this.courses);
  }

  public remove(id: number): void {
    const existingCourse = this.get(id);
    const index = this.courses.indexOf(existingCourse);

    this.courses.splice(index, 1);

    this.coursesSubject.next(this.courses);
  }
}
