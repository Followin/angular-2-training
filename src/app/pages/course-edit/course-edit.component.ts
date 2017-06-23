import {Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import SelectItem from '../../models/selectItem';
import AuthorService from '../../services/author.service';
import Course from '../../models/course';

@Component({
  selector: 'course-edit',
  templateUrl: './course-edit.component.html',
})
export default class CourseEditComponent implements OnInit {
  private title: String;
  private data: Date;
  private authors: SelectItem[] = [];
  private course: Course = {
    title: '',
    description: '',
    createdAt: new Date(),
    id: 999,
    duration: 50,
    top: false,
  };

  constructor(
    private ref: ChangeDetectorRef,
    private route: ActivatedRoute,
    private authorService: AuthorService,
  ) {
    this.initAuthors();
  }

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.title = id ? `Update ${id}` : 'Create';

      this.ref.markForCheck();
    });
  }

  private initAuthors() {
    this.authorService.get().subscribe(authors => {
      this.authors = authors.map(author => {
        return {
          text: author.name,
          value: author.id,
          selected: false,
        };
      });

      this.ref.markForCheck();
    });
  }

  private submit(form: any) {
    form.controls.eachOwnProp((el: any) => {
      el.markAsDirty();
    });
  }
}
