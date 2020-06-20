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
import { AuxiliaresService } from '@shared/services/auxiliares.service';

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
  ciudadanos: Ciudadano[];
  dataSource: MatTableDataSource<Ciudadano>;
  columnsToDisplay = ['Nombre', 'Apellido', 'Direccion', 'Fecha', 'confirmar'];
  expandedElement: Ciudadano | null;
  expand: boolean;
  
  
  constructor(
    private medicoService: MedicoService,
    private auxiliarService: AuxiliaresService
  ) {

    // localStorage.setItem('usuariosCoordenadas', JSON.stringify(usuarios));
    const ciudadanos: Ciudadano[] = JSON.parse(localStorage.getItem('usuariosCoordenadas'));
    this.dataSource = new MatTableDataSource(ciudadanos);
    localStorage.removeItem('usuariosCoordenadas');
  }

  ngOnInit() {
    // this.getVisitasPendientes();
  }

  getVisitasPendientes(): void {
    this.medicoService
      .getVisitasPendientes()
      .subscribe((ciudadanos: Ciudadano[]) => {
        console.log('1) ciudadanos: ', ciudadanos);
        ciudadanos.forEach((ciudadano) => {
          // ciudadano.coords = this.getCoordenadas(ciudadano);
          const direccion = ciudadano.direccion.replace(' ', '+');

          const direccionTotal = direccion + ',+Montevideo';
          console.log('direccionTotal', direccionTotal);
          this.auxiliarService
            .getCoordenadas(direccionTotal)
            .subscribe((res: any) => {
              console.log('getCoordenadas', res);
              // this.center.lat = ;
              ciudadano.coords = {
                lat: res.results[0].geometry.location.lat,
                lng: res.results[0].geometry.location.lng,
              };
            });
        });
        console.log('2) ciudadanos: ', ciudadanos);
        this.dataSource = new MatTableDataSource(ciudadanos);
      });
  }

  confirmarVisitaPendiente(idVisita: number): void {
    this.expand = false;
    console.log('1expandedElement: ', this.expandedElement);

    this.medicoService.confirmarVisitaPendiente(idVisita).subscribe((res) => {
      console.log('res: ', res);
      mensajeConfirmacion('Visita confirmada!', 'Visita confirmada!');
      this.getVisitasPendientes();
    });

    console.log('2expandedElement: ', this.expandedElement);
  }

  expandir(ciudadano) {
    if (this.expand) {
      console.log('4expandedElement: ', this.expandedElement);

      // const direccion = ciudadano.direccion.replace(' ', '+');
      // console.log('direccion', direccion);
      // const direccionTotal = direccion + ',+Montevideo';
      // console.log('direccionTotal', direccionTotal);
      // this.auxiliarService
      //   .getCoordenadas(direccionTotal)
      //   .subscribe((res: any) => {
      //     console.log('getCoordenadas', res);
      //     // this.center.lat = ;
      //     const center: { lat: number; lng: number } = {
      //       lat: res.results[0].geometry.location.lat,
      //       lng: res.results[0].geometry.location.lng,
      //     };
          // this.center.lat = res.results[0].geometry.location.lat;
          // this.center.lng = res.results[0].geometry.location.lng;

          // this.markerPosition.lat = res.results[0].geometry.location.lat;
          // this.markerPosition.lng = res.results[0].geometry.location.lng;

      this.expandedElement = this.expandedElement === ciudadano ? null : ciudadano;
      return;
          // console.log('this.center', this.center);
      }
    this.expand = true;
    }
  }
// getCoordenadas(ciudadano: Ciudadano): void {}

