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
import { ListaRecursosDisponiblesComponent } from './components/lista-recursos-disponibles/lista-recursos-disponibles.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '@environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    LoginComponent,
    MapaComponent,
    ListaRecursosDisponiblesComponent,
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
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    MapaComponent,
    ListaRecursosDisponiblesComponent,
  ],
})
export class SharedModule {}
