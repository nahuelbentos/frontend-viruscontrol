import { Component, OnInit } from '@angular/core';
import { Departamento } from '../../model/departamento.model';
import { MapTypeStyle } from '@agm/core';
import { Marcador } from '@shared/model/marcador.class';
import { Mapa, MapaInteractivo } from '@shared/model/mapa-interactivo.model';
import { PublicService } from '@shared/services/public.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {
  styleMap: MapTypeStyle[] = [
    {
      featureType: 'administrative.land_parcel',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'administrative.neighborhood',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi.business',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'road',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'transit',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
  ];
  marcadores: Marcador[] = [];
  mapaInteractivo: MapaInteractivo;

  lat = -32.5227776;
  lng = -55.7658348;

  constructor(private publicService: PublicService) {
    if (localStorage.getItem('marcadores')) {
      this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
    }
  }

  ngOnInit() {
    this.publicService.getMapaInteractivo()
    .subscribe((mapa: MapaInteractivo) => {
      console.log('mapa: ', mapa);
      this.mapaInteractivo = mapa;
      this.generarDeptos();
    });
  }

  agregarMarcador(evento) {
    console.log(evento);
    // const coords: { lat: number, lng: number } = evento.coords;

    // const nuevoMarcador = new Marcador(coords.lat, coords.lng);

    // this.marcadores.push(nuevoMarcador);

    // this.guardarStorage();
    // this.snackBar.open('Marcador agregado', 'Cerrar', { duration: 3000 });
  }

  borrarMarcador(i: number) {
    this.marcadores.splice(i, 1);
    this.guardarStorage();
  }

  guardarStorage() {
    localStorage.setItem('marcadores', JSON.stringify(this.marcadores));
  }

  generarDeptos() {
    const deptos: Departamento[] = [];
    let depto: Departamento = {
      nombre: 'Montevideo',
      lat: -34.901113,
      lng: -56.164531,
    };
    this.addDepto(depto);

    depto = {
      nombre: 'Artigas',
      lat: -30.617511,
      lng: -56.959456,
    };
    this.addDepto(depto);
    depto = {
      nombre: 'Canelones',
      lat: -34.540872,
      lng: -55.93076,
    };
    this.addDepto(depto);
    depto = {
      nombre: 'Cerro Largo',
      lat: -32.441103,
      lng: -54.352175,
    };
    this.addDepto(depto);
    depto = {
      nombre: 'Colonia',
      lat: -34.129468,
      lng: -57.660518,
    };
    this.addDepto(depto);
    depto = {
      nombre: 'Durazno',
      lat: -33.023245,
      lng: -56.028464,
    };
    this.addDepto(depto);
    depto = {
      nombre: 'Flores',
      lat: -33.573375,
      lng: -56.894503,
    };
    this.addDepto(depto);
    depto = {
      nombre: 'Florida',
      lat: -33.775779,
      lng: -55.859781,
    };
    this.addDepto(depto);
    depto = {
      nombre: 'Lavalleja',
      lat: -33.922617,
      lng: -54.976579,
    };
    this.addDepto(depto);
    depto = {
      nombre: 'Maldonado',
      lat: -34.559793,
      lng: -54.862855,
    };
    this.addDepto(depto);
    depto = {
      nombre: 'Paysandú',
      lat: -32.066737,
      lng: -57.336479,
    };
    this.addDepto(depto);
    depto = {
      nombre: 'Rio Negro',
      lat: -32.767636,
      lng: -57.429521,
    };
    this.addDepto(depto);
    depto = {
      nombre: 'Rivera',
      lat: -31.481742,
      lng: -55.243576,
    };
    this.addDepto(depto);
    depto = {
      nombre: 'Rocha',
      lat: -33.969008,
      lng: -54.021485,
    };
    this.addDepto(depto);
    depto = {
      nombre: 'Salto',
      lat: -31.327547,
      lng: -57.017413,
    };
    this.addDepto(depto);
    depto = {
      nombre: 'San Jose',
      lat: -34.308652,
      lng: -56.725637,
    };
    this.addDepto(depto);
    depto = {
      nombre: 'Soriano',
      lat: -33.510279,
      lng: -57.74981,
    };
    this.addDepto(depto);
    depto = {
      nombre: 'Tacuarembó',
      lat: -32.108221,
      lng: -55.770858,
    };
    this.addDepto(depto);
    depto = {
      nombre: 'Treinta y Tres',
      lat: -33.068509,
      lng: -54.285863,
    };
    this.addDepto(depto);
  }

  addDepto(depto: Departamento) {
    const nuevoMarcador = new Marcador(depto.nombre, depto.lat, depto.lng);
    const deptoInfo = this.mapaInteractivo.mapa.find( m => m.nombre === depto.nombre);
    if (deptoInfo) {
      nuevoMarcador.enfermedades = deptoInfo.enfermedades;
    } else {
      nuevoMarcador.desc = `No existen enfermedades registradas en ${nuevoMarcador.titulo}`;
    }
    this.marcadores.push(nuevoMarcador);
  }
}
