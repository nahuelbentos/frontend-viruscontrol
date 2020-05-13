import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';


@NgModule({
  declarations: [HeaderComponent, FooterComponent, PageNotFoundComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    LayoutModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
  ]
})
export class SharedModule { }
