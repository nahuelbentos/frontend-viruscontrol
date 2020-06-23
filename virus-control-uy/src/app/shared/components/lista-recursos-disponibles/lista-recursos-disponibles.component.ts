import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Recurso } from '@shared/model/Recurso';
import { PublicService } from '@shared/services/public.service';
import { ConcatProvRec } from '@shared/model/ConcatProvRec';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
@Component({
  selector: 'app-lista-recursos-disponibles',
  templateUrl: './lista-recursos-disponibles.component.html',
  styleUrls: ['./lista-recursos-disponibles.component.scss'],
})
export class ListaRecursosDisponiblesComponent implements OnInit {
  // displayedColumns: string[] = ['Nombre', 'Tipo de Recurso', 'Enfermedad', 'Direccion', 'Barrio', 'Ciudad'];
  displayedColumns: string[];
  @Input() dataSource: MatTableDataSource<ConcatProvRec>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public showContainer: boolean;

  constructor(public breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(max-width: 700px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.showContainer = true;
          this.displayedColumns = ['Nombre', 'Tipo de Recurso', 'Ciudad'];

          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log('dataSource ::::: ', this.dataSource);
        } else {
          this.showContainer = false;
          this.displayedColumns = [
            'Nombre',
            'Tipo de Recurso',
            'Enfermedad',
            'Direccion',
            'Barrio',
            'Ciudad',
          ];
          console.log('dataSource ::::: ', this.dataSource);

          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
  }

  applyFilter(filterValue: string) {
    // const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
