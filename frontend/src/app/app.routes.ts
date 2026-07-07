import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';

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
                path: '**',
                loadComponent: () => import('./features/notfound-page/notfound-page').then(m => m.NotfoundPage)
            }
        ],

    }
];
