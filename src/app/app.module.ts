import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { AppComponent } from './app.component';
import CoursesComponent from './pages/courses';

import { ROUTES } from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, { useHash: false, preloadingStrategy: PreloadAllModules }),
  ],
  declarations: [
    AppComponent,
    CoursesComponent,
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
