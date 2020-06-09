import { Component, OnInit } from '@angular/core';
import { CiudadanoService, RequestSuscripcionRecursos } from '@shared/services/ciudadano.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AutenticacionService } from '@shared/services/autenticacion.service';

@Component({
  selector: 'app-suscripcion-recursos',
  templateUrl: './suscripcion-recursos.component.html',
  styleUrls: ['./suscripcion-recursos.component.scss']
})
export class SuscripcionRecursosComponent implements OnInit {

  barrios: string[];
  tipoRecurso: string[];
  formaNotificacion: string[];
  formSubmitted = false;

  constructor(
    public fb: FormBuilder,
    private ciudadanoService: CiudadanoService,
    private autenticacionService: AutenticacionService
  ) { }


  /*########### Form ###########*/
  SuscripcionForm = this.fb.group({
    barrioSeleccionado: [null, Validators.required],
    tipoRecursoSeleccionado: [null, Validators.required],
    formaNotificacionSeleccionada: [null, Validators.required],
  });

  onFormSubmit(){
    this.formSubmitted = true;
    if (!this.SuscripcionForm.valid) {
      return;
    }

      const SuscripcionRecurso: RequestSuscripcionRecursos = {
        idUsuario: this.autenticacionService.user.idUsuario,
        barrio: this.barrioSeleccionadoFiled.value,
        tipoRecurso: this.tipoRecursoSeleccionadoFiled.value,
        formaNotificacion: this.formaNotificacionSeleccionadaFiled.value
      };
  }




  ngOnInit(): void {
  }

  get barrioSeleccionadoFiled(){
    return this.SuscripcionForm.get('barrioSeleccionado');
  }

  get tipoRecursoSeleccionadoFiled(){
    return this.SuscripcionForm.get('tipoRecursoSeleccionado');
  }

  get formaNotificacionSeleccionadaFiled(){
    return this.SuscripcionForm.get('formaNotificacionSeleccionada');
  }


}
