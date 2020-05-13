import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';


const routes: Routes = [

  {
    path: '',
    component: NavMenuComponent,
    children: [
      {
        path: 'dashboard',
        component: HomeComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }


