import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Home2RoutingModule } from './home2-routing.module';
import { Home2Component } from './components/home2/home2.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { LayoutComponent } from './components/layout/layout.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [Home2Component, LayoutComponent],
  imports: [
    CommonModule,
    SharedModule,
    Home2RoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule
  ]
})
export class Home2Module { }
