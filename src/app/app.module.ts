import { NgModule, NgZone } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { FormsModule } from '@angular/forms';

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

import CourseService from './services/course.service';
import LoginService from './services/login.service';
import LoaderService from './services/loader.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
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
  ],
  providers: [
    CourseService,
    LoginService,
    LoaderService,
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule {
  constructor(ngZone: NgZone) {
    ngZone.onUnstable.subscribe(() => {
      console.time('stabilized');
    });

    ngZone.onStable.subscribe(() => {
      console.timeEnd('stabilized');
    });
  }
}
