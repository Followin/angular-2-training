import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { AppComponent } from './app.component';
import CoursesComponent from './pages/courses';

import { ROUTES } from './app.routes';
import IndexComponent from './pages/index';
import BreadcrumbComponent from "./components/breadcrumb";
import HeaderComponent from './components/header';
import LogoComponent from './components/logo';
import LoginComponent from './components/login';

@NgModule({
  imports: [
    BrowserModule,
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
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
