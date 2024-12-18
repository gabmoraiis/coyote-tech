import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoursesComponent } from './courses/courses.component';
import { PagesComponent } from './pages.component';
import { StudentsComponent } from './students/students.component';
import { DisciplinesComponent } from './disciplines/disciplines.component';

export const pagesRoutes: Routes = [
    { path: '', component: PagesComponent,
        children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: 'courses', component: CoursesComponent },
          { path: 'students', component: StudentsComponent },
          { path: 'disciplines', component: DisciplinesComponent },
        ],
      },
      { path: '**', redirectTo: '' },
];