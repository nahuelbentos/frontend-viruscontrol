import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Recurso } from '@shared/model/Recurso';
import { PublicService } from '@shared/services/public.service';
import { ConcatProvRec } from '@shared/model/ConcatProvRec';


@Component({
  selector: 'app-lista-recursos-disponibles',
  templateUrl: './lista-recursos-disponibles.component.html',
  styleUrls: ['./lista-recursos-disponibles.component.scss']
})
export class ListaRecursosDisponiblesComponent implements OnInit {
  displayedColumns: string[] = ['Nombre', 'Tipo de Recurso', 'Enfermedad', 'Direccion', 'Barrio', 'Ciudad'];
   @Input() dataSource: MatTableDataSource<ConcatProvRec>;
  //dataSource: any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  // @Input() recursos: Recurso[];
  constructor() {
    console.log('dataSource ::::: ', this.dataSource);
  //  this.dataSource = new MatTableDataSource(this.recursos);
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    // const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
