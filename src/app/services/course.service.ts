import {Observable} from 'rxjs';
import {Http, Response} from "@angular/http";
import {Injectable} from "@angular/core";

import Course from '../models/course';
import ItemsChunk from '../models/itemsChunk';

class CourseFilter {
  public skip?: number;
  public limit?: number;
  public title?: string;
}

@Injectable()
export default class {
  private courses: Course[];
  private lastIndex: number = 2;

  constructor(private http: Http) { }

  public get(options?: CourseFilter): Observable<ItemsChunk<Course>>;
  public get(id: number): Observable<Course>;

  public get(options?: number | CourseFilter): Observable<ItemsChunk<Course>> | Observable<Course> {
    if (typeof options === "number") {
      return Observable.of(this.courses.find(course => course.id === options));
    }

    let url = `${__API__}/courses`;
    if (options) {
      url += "?";

      if (options.title) {
        url += `name=${options.title}&`
      }

      if (options.skip) {
        url += `skip=${options.skip}&`
      }

      if (options.limit) {
        url += `limit=${options.limit}`
      }
    }

    return this.http.get(url).map(this.mapToCourses);
  }

  public createOrUpdate(course: Course) {
    if (course.id) {
      this.update(course);
    } else {
      this.create(course);
    }
  }

  public remove(id: number): Observable<boolean> {
    return this.http.delete(`${__API__}/courses/${id}`).map(() => true);
  }

  private mapToCourses(response: Response): ItemsChunk<Course> {
    const body = response.json();
    return {
      count: body.count,
      items: body.items.map((course: any) => {
        return {
          id: course.id,
          title: course.name,
          description: course.description,
          top: course.isTopRated,
          createdAt: new Date(course.date),
          duration: course.length
        }
      })
    };
  }

  private create(course: Course): void {
    course.id = ++this.lastIndex;
    this.courses.push(course);
  }

  private update(course: Course): void {
    const existingCourse = this.get(course.id).subscribe(course => {
      const index = this.courses.indexOf(course);

      this.courses[index] = course;
    });
  }
}
