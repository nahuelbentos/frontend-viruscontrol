import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicoRoutingModule } from './medico-routing.module';
import { HomeMedicoComponent } from './components/home-medico/home-medico.component';
import { NavMedicoComponent } from './components/nav-medico/nav-medico.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from '../material/material.module';
import { ListarVisitasComponent } from './components/listar-visitas/listar-visitas.component';
import { SolicitarExamenComponent } from './components/solicitar-examen/solicitar-examen.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MedicoService } from '../shared/services/medico.service';
import { SalaChatComponent } from './components/sala-chat/sala-chat.component';

import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { FilterPipeModule } from 'ngx-filter-pipe';

@NgModule({
  declarations: [
    HomeMedicoComponent,
    NavMedicoComponent,
    ListarVisitasComponent,
    SolicitarExamenComponent,
    SalaChatComponent,
  ],
  imports: [
    CommonModule,
    MedicoRoutingModule,
    LayoutModule,
    ReactiveFormsModule,
    MaterialModule,
    ScrollToModule.forRoot(),
    FormsModule,
    FilterPipeModule,
  ],
  providers: [MedicoService],
})
export class MedicoModule {}
