import { Routes } from '@angular/router';
import CoursesComponent from './pages/courses';
import IndexComponent from './pages/index';

export const ROUTES: Routes = [
  { path: '', component: IndexComponent, data: { label: 'Home' } },
  { path: 'courses', component: CoursesComponent, data: { label: 'Courses' } },
  { path: '**', component: IndexComponent },
];