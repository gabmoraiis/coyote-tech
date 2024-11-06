import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoursesComponent } from './courses/courses.component';
import { PagesComponent } from './pages.component';

export const pagesRoutes: Routes = [
    { path: '', component: PagesComponent,
        children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: 'courses', component: CoursesComponent },
        ],
      },
      { path: '**', redirectTo: '' },
];