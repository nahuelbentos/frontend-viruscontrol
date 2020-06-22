import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePublicRoutingModule } from './home-public-routing.module';
import { HomePublicComponent } from './components/home-public/home-public.component';
import { LayoutComponent } from './components/layout/layout.component';

import { MaterialModule } from '@material/material.module';
import { SharedModule } from '@shared/shared.module';
import { LayoutModule } from '@angular/cdk/layout';
import { AboutUsComponent } from './components/about-us/about-us.component';



@NgModule({
  declarations: [HomePublicComponent, LayoutComponent, AboutUsComponent],
  imports: [
    CommonModule,
    HomePublicRoutingModule,
    SharedModule,
    MaterialModule,
    LayoutModule,
  ],
  exports: [
    HomePublicComponent
  ]
})
export class HomePublicModule { }
