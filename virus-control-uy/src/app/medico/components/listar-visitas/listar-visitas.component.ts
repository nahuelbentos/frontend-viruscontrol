import { Component, OnInit } from '@angular/core';
import { MedicoModule } from '../../medico.module';
import { MatTableDataSource } from '@angular/material/table';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { DataSource } from '@angular/cdk/table';
import { Observable, of, from } from 'rxjs';
import { MedicoService } from '../../../shared/services/medico.service';
import { Ciudadano } from '../../../shared/model/Ciudadano';
import { mensajeConfirmacion } from '@shared/utils/sweet-alert';

@Component({
  selector: 'app-listar-visitas',
  templateUrl: './listar-visitas.component.html',
  styleUrls: ['./listar-visitas.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ListarVisitasComponent implements OnInit {
  private ciudadanos: Ciudadano[];
  dataSource: MatTableDataSource<Ciudadano>;
  columnsToDisplay = [ 'Nombre', 'Apellido', 'Direccion', 'Fecha', 'confirmar'];
  expandedElement: Ciudadano | null;
  expand: boolean;
  constructor(private medicoService: MedicoService) {}

  ngOnInit() {
    this.getVisitasPendientes();
  }

  getVisitasPendientes(): void {
    this.medicoService
      .getVisitasPendientes()
       .subscribe((ciudadano: Ciudadano[]) => {
        console.log(ciudadano);
        this.dataSource = new MatTableDataSource(ciudadano);
      });
  }

  confirmarVisitaPendiente( idVisita: number): void{
    this.expand = false;
    console.log('1expandedElement: ', this.expandedElement);

    this.medicoService.confirmarVisitaPendiente(idVisita)
    .subscribe( (res) => {
      console.log('res: ', res);
      mensajeConfirmacion('pepito', 'sabe');
      this.getVisitasPendientes();
    });

    console.log('2expandedElement: ', this.expandedElement);
 }

 expandir(ciudadano){
   if (this.expand){
    console.log('4expandedElement: ', this.expandedElement);
    this.expandedElement = this.expandedElement === ciudadano ? null : ciudadano;
    return;
  }
   this.expand = true;
 }
}
