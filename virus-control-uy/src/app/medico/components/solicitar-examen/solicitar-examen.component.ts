import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators  } from '@angular/forms';

interface Examen {
  value: string;
  viewValue: string;
}
interface Ciudadano {
  value: string;
  viewValue: string;
}
interface Proveedor {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-solicitar-examen',
  templateUrl: './solicitar-examen.component.html',
  styleUrls: ['./solicitar-examen.component.scss']
})
export class SolicitarExamenComponent implements OnInit {

  isExamSubmitted = false;


  examenes: any[] = [];

  ciudadanos: Ciudadano[] = [
    {value: 'pepe', viewValue: 'Pepe Gonzalez'},
    {value: 'juan', viewValue: 'Juan Perez'},
    {value: 'francisco', viewValue: 'Francisco Fernandez'}
  ];

  proveedores: Proveedor[] = [
    {value: 'biolab', viewValue: 'Bio Lab'},
    {value: 'Lab-20', viewValue: 'Lab 20'}
  ];


  constructor(
    public fb: FormBuilder
    ) { }

  /*########### Form ###########*/
  ExamForm = this.fb.group({
    examenSeleccionado: [null, Validators.required],
    ciudadanoSeleccionado: [null, Validators.required],
    proveedorSeleccionado: [null, Validators.required]
  })

  // Getter method to access formcontrols
  getExamenSeleccionado() {
      return this.ExamForm.get('examenSeleccionado');
  }

  /*########### Template Driven Form ###########*/
  onExamSubmit() {
    this.isExamSubmitted = true;
    if (!this.ExamForm.valid) {
      return false;
    } else {
      alert(JSON.stringify(this.ExamForm.value))
    }

  }



  ngOnInit(): void {
  }

}
