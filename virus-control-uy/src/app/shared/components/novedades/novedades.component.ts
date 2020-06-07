import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Novedad } from '@shared/model/Novedad';
import { PublicService } from '@shared/services/public.service';

@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.scss']
})
export class NovedadesComponent implements OnInit {

  novedades: Novedad[];

  urlNovedad: number;

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
  }

  get enfermedadSeleccionadaFiled(){
    return this.EnfermedadForm.get('enfermedadSeleccionada'); // controls['examenSeleccionado'];
  }

}
