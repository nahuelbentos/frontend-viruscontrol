import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Usuario } from '@shared/model/Usuario';
import { AutenticacionService } from '@shared/services/autenticacion.service';
import { ActivatedRoute, Params } from '@angular/router';
import { mensajeConfirmacion } from '@shared/utils/sweet-alert';
import { switchMap, map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuxiliaresService } from '@shared/services/auxiliares.service';
import { Country } from '@shared/model/Country';

import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import {
  NativeDateAdapter,
  DateAdapter,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import { formatDate } from '@angular/common';

export const PICK_FORMATS = {
  parse: { dateInput: { month: 'short', year: 'numeric', day: 'numeric' } },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  },
};

// Sirve para cambiar el formato del dataPicker
export class PickDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      return formatDate(date, 'dd/MM/yyyy', this.locale);
    } else {
      return date.toDateString();
    }
  }
}

@Component({
  selector: 'app-perfil-ciudadano',
  templateUrl: './perfil-ciudadano.component.html',
  styleUrls: ['./perfil-ciudadano.component.scss'],
  providers: [
    // { provide: DateAdapter, useClass: PickDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS },
  ],
})
export class PerfilCiudadanoComponent implements OnInit {
  // autocomplete

  paises: string[];
  filteredOptions: Observable<string[]>;
  fechaNacimiento: Date;

  usuarioForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private autenticacionService: AutenticacionService,
    private route: ActivatedRoute
  ) {
    const paises: string[] = JSON.parse(localStorage.getItem('paises'));
    localStorage.removeItem('paises');
    this.paises = paises;
    this.buildForm();
  }

  ngOnInit(): void {
    this.filteredOptions = this.nacionalidadField.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.paises.filter((pais) => {
      return pais.toLowerCase().indexOf(filterValue) === 0;
    });
  }

  private buildForm() {
    const usuario: Usuario = this.autenticacionService.user; //JSON.parse(localStorage.getItem('usuario'));
    // this.autenticacionService.user
    // localStorage.removeItem('usuario');
    let fechaNacimiento: any = '';
    if (usuario.fechaNacimiento) {
      fechaNacimiento = usuario.fechaNacimiento;
      console.log('fechaNacimiento: ', fechaNacimiento);
    }
    console.log('usuario.fechaNacimiento: ', usuario.fechaNacimiento);
    console.log('fechaNacimiento: ', fechaNacimiento);

    this.usuarioForm = this.fb.group({
      nombre: [usuario.nombre, Validators.required],
      apellido: [usuario.apellido, Validators.required],
      nacionalidad: [usuario.nacionalidad, Validators.required],
      cedula: [usuario.documento, Validators.required],
      telefono: [usuario.nroTelefono, Validators.required],
      fechaNacimiento,
      direccion: [usuario.direccion, Validators.required],
      email: [usuario.correo, Validators.required],
      username: [usuario.username, Validators.required],
    });
  }

  cambiarDiaFecha(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log('cambiarDiaFecha1');
    console.log(`${type}: ${event.value}`);
    this.fechaNacimiento = event.value;
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
      fechaNacimiento: this.fechaNacimientoField.value,
      nroTelefono: this.telefonoField.value,
      documento: this.cedulaField.value,
    };

    this.autenticacionService.validaDatos(usuario).subscribe((res) => {
      this.autenticacionService.setUser(usuario);
      console.log('res: ', res);
      mensajeConfirmacion(
        'Excelente!',
        'Se han modificado tus datos con exitó!'
      );
    });
  }

  get nombreField() {
    return this.usuarioForm.get('nombre');
  }

  get apellidoField() {
    return this.usuarioForm.get('apellido');
  }

  get telefonoField() {
    return this.usuarioForm.get('telefono');
  }

  get cedulaField() {
    return this.usuarioForm.get('cedula');
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

  get usernameField() {
    return this.usuarioForm.get('username');
  }

  get emailField() {
    return this.usuarioForm.get('email');
  }
}
