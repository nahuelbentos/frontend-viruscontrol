import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


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
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'home2',
        loadChildren: () => import('./home2/home2.module').then(m => m.Home2Module)
      }
    ]
  },
  {
    path: '**',
    loadChildren: () => import('./error/error.module').then(m => m.ErrorModule),
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
