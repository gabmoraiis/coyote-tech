import { Routes } from '@angular/router';

export const routes: Routes = [
    
    { path: 'pages', loadChildren: () => import('../pages/pages.module').then(e => e.PagesModule) },
    { path: '**', redirectTo: 'pages' },
];
