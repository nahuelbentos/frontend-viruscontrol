import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Usuario } from '@shared/model/Usuario';
import { AutenticacionService } from '@shared/services/autenticacion.service';
import { ActivatedRoute, Params } from '@angular/router';
import { mensajeConfirmacion } from '@shared/utils/sweet-alert';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-perfil-ciudadano',
  templateUrl: './perfil-ciudadano.component.html',
  styleUrls: ['./perfil-ciudadano.component.scss']
})
export class PerfilCiudadanoComponent implements OnInit {

  usuarioForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private autenticacionService: AutenticacionService,
    private route: ActivatedRoute) {


    this.buildForm();
  }

  ngOnInit(): void {
    console.log('this.route.params: ', this.route.params);
    this.route.params
      .pipe(
        map(
          (params) => {
            console.log(' params: ', params);
          }
        )
      );

  }

  private buildForm() {
    const usuario: Usuario = JSON.parse(localStorage.getItem('usuario'));
    console.log('usuario: ', usuario);
    this.usuarioForm = this.fb.group({
      nombre: [usuario.nombre, Validators.required],
      apellido: [usuario.apellido, Validators.required],
      nacionalidad: null,
      fechaNacimiento: null,
      direccion: [null, Validators.required],
      email: [usuario.correo, Validators.required],
    });

  }

  guardarCambios(event: Event) {
    event.preventDefault();

    const usuario: Usuario = {

      username: this.emailField.value,
      nombre: this.nombreField.value,
      apellido: this.apellidoField.value,
      nacionalidad: this.nacionalidadField.value,
      direccion: this.direccionField.value,
      correo: this.emailField.value,
    };

    this.autenticacionService.validaDatos(usuario).subscribe(
      (res) => {
        console.log('res: ', res);
        mensajeConfirmacion('Excelente!', 'Se han modificado tus datos con exitó!');
      }
    );
  }


  get nombreField() {
    return this.usuarioForm.get('nombre');
  }

  get apellidoField() {
    return this.usuarioForm.get('apellido');
  }


  get nacionalidadField() {
    return this.usuarioForm.get('nacionalidad');
  }


  get fechaNacimientoField() {
    return this.usuarioForm.get('fechaNacimiento');
  }

  get direccionField() {
    return this.usuarioForm.get('direccion');
  }
  get emailField() {
    return this.usuarioForm.get('email');
  }
}
