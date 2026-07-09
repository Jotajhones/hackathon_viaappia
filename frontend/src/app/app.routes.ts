import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { incidentResolver } from './core/services/incidents-resolver';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'login',
        loadComponent: () => import('./features/login-page/login-page').then(m => m.LoginPage)
    },
    {
        path: '',
        component: MainLayout,
        children: [

            {
                path: 'workspace',
                loadComponent: () => import('./features/workspace-page/workspace-page').then(m => m.WorkspacePage)
            },
            {
                path: 'comments/:id',
                loadComponent: () => import('./features/comments-page/comments-page').then(m => m.CommentsPage),
                resolve: { incidentData: incidentResolver }
            },
            {
                path: '**',
                loadComponent: () => import('./features/notfound-page/notfound-page').then(m => m.NotfoundPage)
            }
        ],

    }
];
