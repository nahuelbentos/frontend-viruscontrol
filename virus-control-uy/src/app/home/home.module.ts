import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';

import { LayoutModule } from '@angular/cdk/layout';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';


@NgModule({
  declarations: [HomeComponent, NavMenuComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    LayoutModule
  ]
})
export class HomeModule { }


