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

@Component({
  selector: 'app-perfil-ciudadano',
  templateUrl: './perfil-ciudadano.component.html',
  styleUrls: ['./perfil-ciudadano.component.scss']
})
export class PerfilCiudadanoComponent implements OnInit {

  // autocomplete

  paises: string[];
  filteredOptions: Observable<string[]>;

  usuarioForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private autenticacionService: AutenticacionService,
    private route: ActivatedRoute) {


    const paises: string[] = JSON.parse(localStorage.getItem('paises'));
    localStorage.removeItem('paises');
    this.paises = paises;
    this.buildForm();
  }

  ngOnInit(): void {

    this.filteredOptions = this.nacionalidadField.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.paises.filter(pais => pais.toLowerCase().indexOf(filterValue) === 0);

  }

  private buildForm() {

    const usuario: Usuario = JSON.parse(localStorage.getItem('usuario'));
    localStorage.removeItem('usuario');


    this.usuarioForm = this.fb.group({
      nombre: [usuario.nombre, Validators.required],
      apellido: [usuario.apellido, Validators.required],
      nacionalidad: ['', Validators.required],
      fechaNacimiento: null,
      direccion: [null, Validators.required],
      email: [usuario.correo, Validators.required],
      username: [usuario.username, Validators.required],
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

  get usernameField() {
    return this.usuarioForm.get('username');
  }

  get emailField() {
    return this.usuarioForm.get('email');
  }

}
