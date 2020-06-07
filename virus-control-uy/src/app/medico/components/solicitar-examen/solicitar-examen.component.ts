import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators  } from '@angular/forms';
import { MedicoService, RequestSolicitarExamen } from '../../../shared/services/medico.service';
import { Examen } from '../../../shared/model/Examen';
import { Ciudadano } from '../../../shared/model/Ciudadano';
import { ProveedorExamen } from '../../../shared/model/ProveedorExamen';
import { Enfermedad } from '@shared/model/Enfermedad';
import { mensajeConfirmacion } from '@shared/utils/sweet-alert';
import { AutenticacionService } from '@shared/services/autenticacion.service';
import { Usuario } from '@shared/model/Usuario';



@Component({
  selector: 'app-solicitar-examen',
  templateUrl: './solicitar-examen.component.html',
  styleUrls: ['./solicitar-examen.component.scss']
})
export class SolicitarExamenComponent implements OnInit {

  isExamSubmitted = false;



  examenes: Examen[];

  ciudadanos: Usuario[];

  proveedores: ProveedorExamen[];

  enfermedades: Enfermedad[];

  enfermedadSelected: number;

  examenSelected: number;

  constructor(
    public fb: FormBuilder,
    private medicoService: MedicoService,
    private autenticacionService: AutenticacionService
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
      return;
    }

    const solicitarExamen: RequestSolicitarExamen = {
      idDepartamento: 100, // se va a cambiar
      idEnfermedad: 100, // se va a cambiar
      idExamen: this.examenSeleccionadoFiled.value,
      idMedico: 1,
      // idMedico: this.autenticacionService.user.idUsuario,
      idPaciente: this.ciudadanoSeleccionadoFiled.value

    };

    this.medicoService.solicitarExamen(solicitarExamen).subscribe( ok => {
      console.log('ok: ', ok);
      if(ok){
        mensajeConfirmacion('Excelente!', 'Se ha solicitado el examen correctamente.');
      }
    });


  }



  ngOnInit() {
    this.medicoService.getEnfermedades()
    .subscribe(
      (enfermedades: Enfermedad[]) => { // Success
        console.log(enfermedades);
        this.enfermedades = enfermedades;
      },
      (error) => {
        console.error(error);
      }
    );



    this.medicoService.getCiudadanosDeMedico()
    .subscribe(
      (ciudadanos: Usuario[]) => { // Success
        console.log(ciudadanos);
        this.ciudadanos = ciudadanos;
      },
      (error) => {
        console.error(error);
      }
    );


  }

  obtenerExamenesDeEnfermedad(id: number){
    this.medicoService.getExamenes(id)
    .subscribe(
      (examenes: Examen[]) => { // Success
        console.log(examenes);
        this.examenes = examenes;
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

  get enfermedadSeleccionadaFiled(){
    return this.ExamForm.get('enfermedadSeleccionada'); // controls['examenSeleccionado'];
  }


  get ciudadanoSeleccionadoFiled(){
    return this.ExamForm.get('ciudadanoSeleccionado'); // controls['examenSeleccionado'];
  }
}
