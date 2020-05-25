import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators  } from '@angular/forms';
import { MedicoService } from '../../../shared/services/medico.service';
import { Examen } from '../../../shared/model/Examen';
import { Ciudadano } from '../../../shared/model/Ciudadano';
import { ProveedorExamen } from '../../../shared/model/ProveedorExamen';
import { Enfermedad } from '@shared/model/Enfermedad';


interface ResponseSolicitarExamen {
  idDepartamento: number;
  idExamen: number;
  idEnfermedad: number;
  idPaciente: number;
  idMedico: number;
}

@Component({
  selector: 'app-solicitar-examen',
  templateUrl: './solicitar-examen.component.html',
  styleUrls: ['./solicitar-examen.component.scss']
})
export class SolicitarExamenComponent implements OnInit {

  isExamSubmitted = false;



  examenes: Examen[];

  ciudadanos: Ciudadano[];

  proveedores: ProveedorExamen[];

  enfermedades: Enfermedad[];


  constructor(
    public fb: FormBuilder,
    private medicoService: MedicoService
    ) { }



  /*########### Form ###########*/
  ExamForm = this.fb.group({
    examenSeleccionado: [null, Validators.required],
    ciudadanoSeleccionado: [null, Validators.required],
    proveedorSeleccionado: [null, Validators.required]
  });

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
      alert(JSON.stringify(this.ExamForm.value));

    }

  }



  ngOnInit() {
    this.medicoService.getExamenes()
    .subscribe(
      (examenes: Examen[]) => { // Success
        console.log(examenes);
        this.examenes = examenes;
      },
      (error) => {
        console.error(error);
      }
    );

    this.medicoService.getCiudadanosDeMedico()
    .subscribe(
      (ciudadanos: Ciudadano[]) => { // Success
        console.log(ciudadanos);
        this.ciudadanos = ciudadanos;
      },
      (error) => {
        console.error(error);
      }
    );


  }

  obtenerProveedores(id: number){

    this.medicoService.getProveedoresDeExamenes(id)
    .subscribe(
      (proveedores: ProveedorExamen[]) => { // Success
        console.log(proveedores);
        this.proveedores = proveedores;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  get examenSeleccionadoFiled(){
    return this.ExamForm.get('examenSeleccionado'); // controls['examenSeleccionado'];
  }
}
