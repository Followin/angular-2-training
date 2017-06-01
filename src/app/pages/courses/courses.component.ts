import { Component } from '@angular/core';
import Course from '../../models/course';

@Component({
  selector: 'courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export default class CoursesComponent {
  private courses: Course[];
  private filter: string;

  constructor() {
    this.courses = [];
  }

  public ngOnInit() {
    this.courses = [{
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
  }

  private search() {
    console.log(this.filter);
  }

  private deleteCourse(id: number) {
    console.log(`Removed ${id}`);
  }
}
