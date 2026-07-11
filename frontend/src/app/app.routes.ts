import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { incidentResolver } from './core/services/incidents-resolver';
import { authGuard } from './core/services/auth-guard';

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
                loadComponent: () => import('./features/workspace-page/workspace-page').then(m => m.WorkspacePage),
                canActivate: [authGuard]
            },
            {
                path: 'comments/:id',
                loadComponent: () => import('./features/comments-page/comments-page').then(m => m.CommentsPage),
                resolve: { incidentData: incidentResolver },
                canActivate: [authGuard]
            },
            {
                path: '**',
                loadComponent: () => import('./features/notfound-page/notfound-page').then(m => m.NotfoundPage)
            }
        ],

    }
];
