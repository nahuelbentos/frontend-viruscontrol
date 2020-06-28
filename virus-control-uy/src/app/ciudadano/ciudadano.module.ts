import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CiudadanoRoutingModule } from './ciudadano-routing.module';
import { HomeCiudadanoComponent } from './components/home-ciudadano/home-ciudadano.component';
import { NavCiudadanoComponent } from './components/nav-ciudadano/nav-ciudadano.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { PerfilCiudadanoComponent } from './components/perfil-ciudadano/perfil-ciudadano.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '@material/material.module';
import { ResultadosExamenesComponent } from './components/resultados-examenes/resultados-examenes.component';
import { SuscripcionRecursosComponent } from './components/suscripcion-recursos/suscripcion-recursos.component';
import { HomePublicModule } from '../home-public/home-public.module';

import { SalaChatComponent } from './components/sala-chat/sala-chat.component';
import { SharedModule } from '@shared/shared.module';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

@NgModule({
  declarations: [
    HomeCiudadanoComponent,
    NavCiudadanoComponent,
    PerfilCiudadanoComponent,
    ResultadosExamenesComponent,
    SuscripcionRecursosComponent,
    SalaChatComponent,
  ],
  imports: [
    CommonModule,
    CiudadanoRoutingModule,
    LayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    HomePublicModule,
    SharedModule,
    FilterPipeModule,
    ScrollToModule.forRoot(),
    FormsModule,
  ],
})
export class CiudadanoModule {}

