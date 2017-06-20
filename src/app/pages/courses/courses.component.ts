import {Component, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import Course from '../../models/course';
import CourseService from '../../services/course.service';
import LoaderService from '../../services/loader.service';
import swal from 'sweetalert2';
import ItemsChunk from "../../models/itemsChunk";

@Component({
  selector: 'courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CoursesComponent {
  private courses: Course[] = [];
  private filter: string = '';
  private itemsPerPage = 5;
  private totalPages: number = 0;
  private currentPage: number = 1;

  constructor(
    private courseService: CourseService,
    private loaderService: LoaderService,
    private ref: ChangeDetectorRef,
  ) { }

  public ngOnInit() {
    this.initCourses();
  }

  private search() {
    this.initCourses();
  }

  private initCourses(page: number = 1) {
    this.courseService.get({title: this.filter, limit: this.itemsPerPage, skip: this.itemsPerPage * (page - 1)})
      .subscribe(this.handleCourses.bind(this));

    this.currentPage = page;
  }

  private handleCourses(value: ItemsChunk<Course>) {
    this.courses = value.items;
    this.totalPages = Math.ceil(value.count / this.itemsPerPage);
    this.ref.markForCheck();
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
      this.courseService.remove(id).subscribe(status => {
        if (status) {
          this.initCourses(this.currentPage);
        }

        this.loaderService.hide();
      });
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
