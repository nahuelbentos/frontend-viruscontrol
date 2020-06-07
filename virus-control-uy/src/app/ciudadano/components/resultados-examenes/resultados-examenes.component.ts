import { Component, OnInit } from '@angular/core';
import { Examen } from '@shared/model/Examen';
import { MatTableDataSource } from '@angular/material/table';
import { CiudadanoService } from '@shared/services/ciudadano.service';
import { ResultadoExamen } from '@shared/model/ResultadoExamen';


@Component({
  selector: 'app-resultados-examenes',
  templateUrl: './resultados-examenes.component.html',
  styleUrls: ['./resultados-examenes.component.scss']
})
export class ResultadosExamenesComponent implements OnInit {
  private examenes: ResultadoExamen[];
  dataSource: MatTableDataSource<ResultadoExamen>;
  displayedColumns: string[] = ['Examen', 'Resultado'];
  constructor(private ciudadanoService: CiudadanoService) { }

  ngOnInit(): void {
    this.getResultadosExamenes()
  }

  getResultadosExamenes(): void {
    this.ciudadanoService.getResultadosExamenes().subscribe((resultadoExamen: ResultadoExamen[]) =>{
      console.log(resultadoExamen);
      this.dataSource = new MatTableDataSource(resultadoExamen);
    });
  }
}
