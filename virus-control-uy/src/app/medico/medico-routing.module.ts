import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeMedicoComponent } from './components/home-medico/home-medico.component';
import { NavMedicoComponent } from './components/nav-medico/nav-medico.component';
import { ListarVisitasComponent } from './components/listar-visitas/listar-visitas.component';
import { SolicitarExamenComponent } from './components/solicitar-examen/solicitar-examen.component';
import { SalaChatComponent } from './components/sala-chat/sala-chat.component';



const routes: Routes = [
  {
    path: '',
    component: NavMedicoComponent,
    children: [
      {
        path: 'home',
        component: HomeMedicoComponent,
      },
      {
        path: 'listar-visitas',
        component: ListarVisitasComponent,
      },
      {
        path: 'solicitar-examen',
        component: SolicitarExamenComponent,
      },
      {
        path: 'sala-chat',
        component: SalaChatComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicoRoutingModule { }
