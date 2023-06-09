import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { LoginComponent } from './components/login/login.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';
import { NovedadesComponent } from './components/novedades/novedades.component';

import { GoogleMapsModule } from '@angular/google-maps';

import { ListaRecursosDisponiblesComponent } from './components/lista-recursos-disponibles/lista-recursos-disponibles.component';


// Import ngx-twitter-timeline
import { NgxTwitterTimelineModule } from 'ngx-twitter-timeline';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { environment } from '@environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { DonacionesComponent } from './components/donaciones/donaciones.component';
import { GoogleMapsComponent } from './components/google-maps/google-maps.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    LoginComponent,
    MapaComponent,
    NovedadesComponent,
    ListaRecursosDisponiblesComponent,
    DonacionesComponent,
    GoogleMapsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDNOu2JQ001PxZY-GVwFvVou0_6h_Sj-14',
    }),
    LayoutModule,
    // Specify library as an import
    NgxTwitterTimelineModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    GoogleMapsModule,
    AngularFireDatabaseModule

  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    MapaComponent,
    ListaRecursosDisponiblesComponent,
    NovedadesComponent,
    DonacionesComponent,
    GoogleMapsComponent
  ],
})
export class SharedModule {}
