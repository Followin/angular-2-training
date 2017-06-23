import {NgModule, NgZone, forwardRef} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, PreloadAllModules } from '@angular/router';
import {FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {HttpModule, XHRBackend, RequestOptions, Http} from '@angular/http';

import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import CoursesComponent from './pages/courses';
import IndexComponent from './pages/index';
import BreadcrumbComponent from './components/breadcrumb';
import HeaderComponent from './components/header';
import LogoComponent from './components/logo';
import LoginComponent from './components/login';
import CourseComponent from './components/course';
import FooterComponent from './components/footer';
import CourseEditComponent from './pages/course-edit';
import LoginPage from './pages/login';
import LoaderBlockComponent from './components/loader-block';
import DateInputComponent from './components/date-input';
import DurationInputComponent from './components/duration-input';
import MultiSelectComponent from './components/multiselect';
import PaginationComponent from './components/pagination';

import CourseService from './services/course.service';
import LoginService from './services/login.service';
import LoaderService from './services/loader.service';
import AuthHttpService from './services/authHttp.service';

import DateHighlightDirective from './directives/date-highlight.directive';

import DurationPipe from './pipes/duration.pipe';
import OrderCoursesByCreationDatePipe from './pipes/orderCoursesByCreationDate.pipe';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: false, preloadingStrategy: PreloadAllModules }),
  ],
  declarations: [
    AppComponent,
    IndexComponent,
    BreadcrumbComponent,
    CoursesComponent,
    HeaderComponent,
    LoginComponent,
    LogoComponent,
    CourseComponent,
    FooterComponent,
    CourseEditComponent,
    LoginPage,
    LoaderBlockComponent,
    DateInputComponent,
    DurationInputComponent,
    MultiSelectComponent,
    PaginationComponent,

    DateHighlightDirective,

    DurationPipe,
    OrderCoursesByCreationDatePipe,
  ],
  providers: [
    CourseService,
    LoginService,
    LoaderService,
    {
      provide: Http,
      useFactory: (backend: XHRBackend, options: RequestOptions) => {
        return new AuthHttpService(backend, options);
      },
      deps: [XHRBackend, RequestOptions],
    },
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule {
}
