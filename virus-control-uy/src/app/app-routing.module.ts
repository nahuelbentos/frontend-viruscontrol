import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';


const routes: Routes = [
  {
    path: '',
    // component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./home-public/home-public.module').then((m) => m.HomePublicModule),
      },
      {
        path: 'medico',
        loadChildren: () =>
          import('./medico/medico.module').then((m) => m.MedicoModule),
      }
    ],
  },
  {
    path: '**',
    loadChildren: () =>
      import('./error/error.module').then((m) => m.ErrorModule),
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
