import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoursesComponent } from './courses/courses.component';

export const panelRoutes: Routes = [
    { path:'', component: DashboardComponent},
    { path:'courses', component: CoursesComponent}
];
