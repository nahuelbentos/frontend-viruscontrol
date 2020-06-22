import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeCiudadanoComponent } from './components/home-ciudadano/home-ciudadano.component';
import { NavCiudadanoComponent } from './components/nav-ciudadano/nav-ciudadano.component';
import { PerfilCiudadanoComponent } from './components/perfil-ciudadano/perfil-ciudadano.component';
import { ResultadosExamenesComponent } from './components/resultados-examenes/resultados-examenes.component';
import { SuscripcionRecursosComponent } from './components/suscripcion-recursos/suscripcion-recursos.component';
import { SalaChatComponent } from './components/sala-chat/sala-chat.component';



const routes: Routes = [
  {
    path: '',
    component: NavCiudadanoComponent,
    children: [
      {
        path: 'home',
        component: HomeCiudadanoComponent,
      },
      {
        path: 'chat',
        component: SalaChatComponent,
      },
      {
        path: 'perfil',
        component: PerfilCiudadanoComponent,
      },
      {
        path: 'resultados-examenes',
        component: ResultadosExamenesComponent,
      },
      {
        path: 'suscripcion-recursos',
        component: SuscripcionRecursosComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CiudadanoRoutingModule { }
