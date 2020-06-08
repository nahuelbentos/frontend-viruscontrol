import { Component, OnInit } from '@angular/core';
import { CiudadanoService } from '@shared/services/medico.service';

@Component({
  selector: 'app-suscripcion-recursos',
  templateUrl: './suscripcion-recursos.component.html',
  styleUrls: ['./suscripcion-recursos.component.scss']
})
export class SuscripcionRecursosComponent implements OnInit {

  barrio: string;
  tipoRecurso: string;
  formaNotificacion: string;

  constructor(
    public fb: FormBuilder,
    private medicoService: MedicoService,
  ) { }

  ngOnInit(): void {
  }

}
