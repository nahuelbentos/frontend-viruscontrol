import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Novedad } from '@shared/model/Novedad';
import { PublicService } from '@shared/services/public.service';

@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.scss']
})

export class NovedadesComponent implements OnInit  {

  novedades: Novedad[];
  data: {sourceType?: string, url?: string} = {};

  urlNovedad: string;
  url: string;
  constructor(
    public fb: FormBuilder,
    private publicService: PublicService,
  ) { }

  /*########### Form ###########*/
  EnfermedadForm = this.fb.group({
    enfermedadSeleccionada: [null],
  });

  ngOnInit(): void {

    this.publicService.getNovedades()
    .subscribe(
      (novedades: Novedad[]) => { // Success
        console.log(novedades);
        this.novedades = novedades;
      },
      (error) => {
        console.error(error);
      }
    );
  }



  OnEnfermedadSubmit(){
    this.urlNovedad = this.enfermedadSeleccionadaFiled.value;
    this.data.sourceType = 'url';
    this.data.url = this.urlNovedad;
    }

  get enfermedadSeleccionadaFiled(){
    return this.EnfermedadForm.get('enfermedadSeleccionada'); // controls['examenSeleccionado'];
  }


}
