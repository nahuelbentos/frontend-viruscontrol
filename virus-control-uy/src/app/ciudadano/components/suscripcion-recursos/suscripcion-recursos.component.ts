import { Component, OnInit } from '@angular/core';
import {
  CiudadanoService,
  RequestSuscripcionRecursos,
} from '@shared/services/ciudadano.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AutenticacionService } from '@shared/services/autenticacion.service';
import { TipoRecurso } from '@shared/model/TipoRecurso';
import { mensajeConfirmacion } from '@shared/utils/sweet-alert';
import { Recurso } from '@shared/model/Recurso';
import { RecursoPorBarrio } from '@shared/model/RecursoPorBarrio';

@Component({
  selector: 'app-suscripcion-recursos',
  templateUrl: './suscripcion-recursos.component.html',
  styleUrls: ['./suscripcion-recursos.component.scss'],
})
export class SuscripcionRecursosComponent implements OnInit {
  barrios: string[];
  recursos: Recurso[];
  formaNotificaciones: string[] = ['Email'];
  formSubmitted = false;
  barrioSelected: string;
  showSppiner = false;

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
      barrio: this.barrioSeleccionadoFiled.value,
      recurso: this.tipoRecursoSeleccionadoFiled.value,
    };

    this.ciudadanoService
      .postSuscripcionRecurso(SuscripcionRecurso)
      .subscribe((ok) => {
        console.log('ok: ', ok);
        mensajeConfirmacion(
          'Excelente!',
          'Le notificaremos cuando los recursos estén disponibles en su barrio.'
        );
      });
  }

  ngOnInit() {
    this.ciudadanoService.getBarrios().subscribe(
      (barrios: string[]) => {
        // Success
        console.log(this.barrios);
        this.barrios = barrios;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  obtenerRecursosDeBarrio(nombreBarrio: string) {
    if (nombreBarrio) {

      this.showSppiner = true;
      this.ciudadanoService.getRecursosDeBarrio(nombreBarrio).subscribe(
        (recursoPorBarrio: RecursoPorBarrio[]) => {
          // Success
          console.log(recursoPorBarrio);

          this.recursos = [];
          // este aux no lo borres porque es el que hace la magia jaja
          const aux: any = recursoPorBarrio.map((item) => {
            return item.recurso.map((itemRecurso) => {
              const exist = this.recursos.find(recurso => recurso.id === itemRecurso.id);

              if (!exist){
                this.recursos.push(itemRecurso);
              }
              return itemRecurso;
            });
          });

        this.showSppiner = false;
        },
        (error) => {
          console.error(error);
        }
      );
    }
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
