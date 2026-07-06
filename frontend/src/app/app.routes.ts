import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'login',
        loadComponent: () => import('./features/login-page/login-page').then(m => m.LoginPage)
    },
    {
        path: 'workspace',
        loadComponent: () => import('./features/workspace-page/workspace-page').then(m => m.WorkspacePage)
    },
    { 
        path: '**', 
        loadComponent:() => import('./features/notfound-page/notfound-page').then(m => m.NotfoundPage) 
    }
];
