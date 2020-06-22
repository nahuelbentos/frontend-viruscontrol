import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent implements OnInit {
  integrantes: {
    nombre: string;
    mail: string;
    mailTo: string;
  }[] = [
    {
      nombre: 'Nahuel Bentos',
      mail: 'nahuelbentosgnocchi@gmail.com',
      mailTo:
        'mailto:nahuelbentosgnocchi@gmail.com?subject=Contacto Virus Contorl UY',
    },
    {
      nombre: 'Santiago Chabert',
      mail: 'santiagochabert@gmail.com',
      mailTo:
        'mailto:santiagochabert@gmail.com?subject=Contacto Virus Contorl UY',
    },
    {
      nombre: 'Rodrigo Lamé',
      mail: 'rodrigo.lame96@gmail.com',
      mailTo:
        'mailto:rodrigo.lame96@gmail.com?subject=Contacto Virus Contorl UY',
    },
    {
      nombre: 'Jhonatan Sosa',
      mail: 'jhonatansosaferreira@gmail.com',
      mailTo:
        'mailto:jhonatansosaferreira@gmail.com?subject=Contacto Virus Contorl UY',
    },
    {
      nombre: 'Maximiliano Farcilli',
      mail: 'maxifarcilli@gmail.com',
      mailTo: 'mailto:maxifarcilli@gmail.com?subject=Contacto Virus Contorl UY',
    },
    {
      nombre: 'Natalie Di Bono',
      mail: 'ndb1985@gmail.com',
      mailTo: 'mailto:ndb1985@gmail.com?subject=Contacto Virus Contorl UY',
    },
    {
      nombre: 'Mauricio Hernandez',
      mail: 'mghb1985@gmail.com',
      mailTo: 'mailto:mghb1985@gmail.com?subject=Contacto Virus Contorl UY',
    },
    {
      nombre: 'Javier Mata',
      mail: 'javierms17@gmail.com',
      mailTo: 'mailto:javierms17@gmail.com?subject=Contacto Virus Contorl UY',
    },
  ];

  displayedColumns: string[] = ['nombre', 'email'];
  dataSource = this.integrantes;
  constructor() {}

  ngOnInit(): void {}
}
