import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeMedicoComponent } from './components/home-medico/home-medico.component';
import { NavMedicoComponent } from './components/nav-medico/nav-medico.component';



const routes: Routes = [
  {
    path: '',
    component: NavMedicoComponent,
    children: [
      
      {
        path: 'home',
        component: HomeMedicoComponent
      }

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicoRoutingModule { }
