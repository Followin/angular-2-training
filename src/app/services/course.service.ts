import Course from '../models/course';

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

  private lastIndex: number = 2;

  public get(): Course[];
  public get(id: number): Course;

  public get(id?: number): Course[] | Course {
    if (id != null) {
      return this.courses.find(course => course.id === id);
    }

    return this.courses.slice(0);
  }

  public create(course: Course): void {
    course.id = ++this.lastIndex;
    this.courses.push(course);
  }

  public update(course: Course): void {
    const existingCourse = this.get(course.id);
    const index = this.courses.indexOf(existingCourse);

    this.courses[index] = course;
  }

  public remove(id: number): void {
    const existingCourse = this.get(id);
    const index = this.courses.indexOf(existingCourse);

    this.courses.splice(index, 1);
  }
}
