import { Routes } from '@angular/router';
import CoursesComponent from './pages/courses';
import IndexComponent from './pages/index';
import CourseEditComponent from './pages/course-edit';

export const ROUTES: Routes = [
  { path: '', component: IndexComponent, data: { label: 'Home' } },
  { path: 'courses', component: CoursesComponent, data: { label: 'Courses' } },
  { path: 'courses/:id', component: CourseEditComponent, data: { label: 'Edit' } },
  { path: '**', component: IndexComponent },
];
