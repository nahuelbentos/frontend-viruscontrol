import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Recurso } from '@shared/model/Recurso';
import { PublicoService } from '@shared/services/publico.service';

@Component({
  selector: 'app-lista-recursos-disponibles',
  templateUrl: './lista-recursos-disponibles.component.html',
  styleUrls: ['./lista-recursos-disponibles.component.scss']
})
export class ListaRecursosDisponiblesComponent implements OnInit {
  private recursos: Recurso[];
  displayedColumns: string[] = ['Nombre', 'Tipo de Recurso', 'Enfermedad'];
  dataSource: MatTableDataSource<Recurso>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private publicoService: PublicoService) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getRecursos()
  }

  getRecursos(): void{
    this.publicoService.getRecursos().subscribe((recurso: Recurso[])  => {
      console.log(recurso);
      this.dataSource = new MatTableDataSource(recurso);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
