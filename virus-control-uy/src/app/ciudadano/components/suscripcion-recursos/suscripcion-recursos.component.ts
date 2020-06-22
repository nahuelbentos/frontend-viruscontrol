import { Component, OnInit } from '@angular/core';
import {
  CiudadanoService,
  RequestSuscripcionRecursos,
} from '@shared/services/ciudadano.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AutenticacionService } from '@shared/services/autenticacion.service';
import { TipoRecurso } from '@shared/model/TipoRecurso';
import { mensajeConfirmacion } from '@shared/utils/sweet-alert';

@Component({
  selector: 'app-suscripcion-recursos',
  templateUrl: './suscripcion-recursos.component.html',
  styleUrls: ['./suscripcion-recursos.component.scss'],
})
export class SuscripcionRecursosComponent implements OnInit {
  barrios: string[];
  tipoRecursos: TipoRecurso[];
  formaNotificaciones: string[]  = ["Email"];
  formSubmitted = false;

  constructor(
    public fb: FormBuilder,
    private ciudadanoService: CiudadanoService,
    private autenticacionService: AutenticacionService
  ) {}

  /*########### Form ###########*/
  SuscripcionForm = this.fb.group({
    barrioSeleccionado: [null, Validators.required],
    tipoRecursoSeleccionado: [null, Validators.required],
    formaNotificacionSeleccionada: [null, Validators.required],
  });

  onFormSubmit() {
    this.formSubmitted = true;
    if (!this.SuscripcionForm.valid) {
      return;
    }

    const SuscripcionRecurso: RequestSuscripcionRecursos = {
      ciudadanoId: this.autenticacionService.user.idUsuario,
      barrio: this.barrioSeleccionadoFiled.value,
      recurso: this.tipoRecursoSeleccionadoFiled.value,
    };

    this.ciudadanoService.postSuscripcionRecurso(SuscripcionRecurso).subscribe( ok => {
      console.log('ok: ', ok);
      if(ok){
        mensajeConfirmacion('Excelente!', 'Le notificaremos cuando los recursos estén disponibles en su barrio.');
      }
    });
  }

  ngOnInit(){
    this.ciudadanoService.getBarrios()
    .subscribe(
      (barrios: string[]) => { // Success
        console.log(this.barrios);
        this.barrios = barrios;
      },
      (error) => {
        console.error(error);
      }
    );

    this.ciudadanoService.getTipoRecursos()
    .subscribe(
      (tipoRecursos: TipoRecurso[]) => { // Success
        console.log(this.tipoRecursos);
        this.tipoRecursos = tipoRecursos;
      },
      (error) => {
        console.error(error);
      }
    );


  }

  get barrioSeleccionadoFiled() {
    return this.SuscripcionForm.get('barrioSeleccionado');
  }

  get tipoRecursoSeleccionadoFiled() {
    return this.SuscripcionForm.get('tipoRecursoSeleccionado');
  }

  get formaNotificacionSeleccionadaFiled() {
    return this.SuscripcionForm.get('formaNotificacionSeleccionada');
  }
}
