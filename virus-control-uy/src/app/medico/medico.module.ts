import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicoRoutingModule } from './medico-routing.module';
import { HomeMedicoComponent } from './components/home-medico/home-medico.component';
import { NavMedicoComponent } from './components/nav-medico/nav-medico.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ListarVisitasComponent } from './components/listar-visitas/listar-visitas.component';
import { SolicitarExamenComponent } from './components/solicitar-examen/solicitar-examen.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [ HomeMedicoComponent, NavMedicoComponent, ListarVisitasComponent, SolicitarExamenComponent],
  imports: [
    CommonModule,
    MedicoRoutingModule,
    LayoutModule,
    MaterialModule
  ]
})
export class MedicoModule { }
