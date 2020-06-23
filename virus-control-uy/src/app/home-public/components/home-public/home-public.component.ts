import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { PublicService } from '@shared/services/public.service';
import { Recurso } from '@shared/model/Recurso';
import { MatTableDataSource } from '@angular/material/table';
import { ProveedorRecursos } from '@shared/model/ProveedorRecursos';
import { ConcatProvRec } from '@shared/model/ConcatProvRec';

interface RecursoResp {
  proveedor?: ProveedorRecursos[];
  recurso: Recurso[];
}


@Component({
  selector: 'app-home-public',
  templateUrl: './home-public.component.html',
  styleUrls: ['./home-public.component.scss'],
})
export class HomePublicComponent implements OnInit {
  recursos: Recurso[] = [];
  existeRecursos = false;
  // dataSource: any;
  dataSource: MatTableDataSource<ConcatProvRec>;
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { id: 1, title: 'Mapa', cols: 2, rows: 2 },
          { id: 2, title: 'Novedades de enfermedades', cols: 2, rows: 2 },
          { id: 3, title: 'Lista de Recursos disponibles', cols: 2, rows: 2 },
          { id: 4, title: 'Donaciones', cols: 2, rows: 1 },
        ];
      }

      return [
        { id: 1, title: 'Mapa', cols: 2, rows: 2 },
        { id: 2, title: 'Novedades de enfermedades', cols: 2, rows: 2 },
        { id: 3, title: 'Lista de recursos disponibles', cols: 2, rows: 2 },
        { id: 4, title: 'Donaciones', cols: 2, rows: 1 },
      ];
    })
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private publicService: PublicService
  ) {
    this.getRecursosDisponibles();
  }

  ngOnInit(): void {}

  getRecursosDisponibles(): void {
    this.publicService
      .getRecursosDisponibles()
      .subscribe((res: any[]) => {
        console.log('res ', res);
        const listaAux: any[] = [];
        const recursoTemp: Recurso[] = [];
        const proveedorTemp: any[] = [];


        for (const item of res) {
          for (const rec of item.recurso) {
            console.log('rec.enfermedades[0] ', rec.enfermedades[0]);
            let obj1 = new ConcatProvRec();
            
            let enfermedades = '';
            for(const enfermedad of rec.enfermedades){
              if(!enfermedades.includes(enfermedad.nombre)){
                enfermedades += ` ${enfermedad.nombre}`;              
              }
            }
            console.log('enfermedades ', enfermedades);

            obj1.enfermedad = enfermedades; // rec.enfermedades[0];
            obj1.nombre = rec.nombre;
            obj1.tipoRecurso = rec.tipoRecurso.nombre;
            obj1.barrio = item.proveedor.barrio;
            obj1.ciudad = item.proveedor.ciudad;
            obj1.direccion = item.proveedor.direccion;
            listaAux.push(obj1);
          }
        }
        console.log('listaAux:', listaAux);
        console.log('recurso:', recursoTemp);
        console.log('proveedor:', proveedorTemp);
        this.recursos = recursoTemp;
        this.existeRecursos = true;
        // this.dataSource = listaAux;
        this.dataSource = new MatTableDataSource(listaAux);
      });
  }
}
