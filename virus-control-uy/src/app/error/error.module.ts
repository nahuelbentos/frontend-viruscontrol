import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorRoutingModule } from './error-routing.module';
import { ErrorComponent } from './components/error/error.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [ErrorComponent],
  imports: [
    CommonModule,
    ErrorRoutingModule,
    MaterialModule
  ]
})
export class ErrorModule { }
