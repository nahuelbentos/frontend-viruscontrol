import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { AutenticacionGuard } from '@shared/services/autenticacion.guard';
import { AuthCiudadanoGuard } from '@shared/services/auth-ciudadano.guard';
import { AuthMedicoGuard } from '@shared/services/auth-medico.guard';

import { NovedadesComponent } from './shared/components/novedades/novedades.component';

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
        path: 'twitter',
        component: NovedadesComponent,
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./home-public/home-public.module').then((m) => m.HomePublicModule)
      },
      {
        path: 'medico',
        loadChildren: () =>
          import('./medico/medico.module').then((m) => m.MedicoModule),
          canActivate: [AuthMedicoGuard]
      },
      {
        path: 'ciudadano',
        loadChildren: () =>
          import('./ciudadano/ciudadano.module').then((m) => m.CiudadanoModule),
          canActivate: [AuthCiudadanoGuard]
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
