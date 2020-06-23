import { Component, OnInit } from '@angular/core';
import { Examen } from '@shared/model/Examen';
import { MatTableDataSource } from '@angular/material/table';
import { CiudadanoService } from '@shared/services/ciudadano.service';
import { ResultadoExamen } from '@shared/model/ResultadoExamen';

@Component({
  selector: 'app-resultados-examenes',
  templateUrl: './resultados-examenes.component.html',
  styleUrls: ['./resultados-examenes.component.scss'],
})
export class ResultadosExamenesComponent implements OnInit {
  private examenes: ResultadoExamen[];
  dataSource: MatTableDataSource<ResultadoExamen>;
  displayedColumns: string[] = ['Examen', 'Resultado', 'reporte'];
  constructor(private ciudadanoService: CiudadanoService) {}

  ngOnInit(): void {
    this.getResultadosExamenes();
  }

  getResultadosExamenes(): void {
    this.ciudadanoService
      .getResultadosExamenes()
      .subscribe((resultadoExamen: ResultadoExamen[]) => {
        console.log('res examen', resultadoExamen);
        this.dataSource = new MatTableDataSource(resultadoExamen);
      });
  }

  descargarPDF(idCaso) {
    this.ciudadanoService.getPDF(idCaso).subscribe((res: any) => {
      console.log('res: ', res);
      
      var newBlob = new Blob([res], { type: 'application/pdf' });

      // IE doesn't allow using a blob object directly as link href
      // instead it is necessary to use msSaveOrOpenBlob
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
      }

      // For other browsers:
      // Create a link pointing to the ObjectURL containing the blob.
      const data = window.URL.createObjectURL(newBlob);

      var link = document.createElement('a');
      link.href = data;
      link.download = 'Je kar.pdf';
      // this is necessary as link.click() does not work on the latest firefox
      link.dispatchEvent(
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      );

      setTimeout(function () {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100);


      // var file = new Blob([data], { type: 'application/pdf' });
      // var fileURL = URL.createObjectURL(file);

      // // if you want to open PDF in new tab
      // window.open(fileURL);
      // var a = document.createElement('a');
      // a.href = fileURL;
      // a.target = '_blank';
      // a.download = 'bill.pdf';
      // document.body.appendChild(a);
      // a.click();
    });
  }
}
