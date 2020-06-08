import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home-public',
  templateUrl: './home-public.component.html',
  styleUrls: ['./home-public.component.scss'],
})
export class HomePublicComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { id: 1, title: 'Mapa', cols: 1, rows: 1 },
          { id: 2, title: 'Card 2', cols: 1, rows: 1 },
          { id: 3, title: 'Card 3', cols: 1, rows: 1 },
          { id: 4, title: 'Card 4', cols: 1, rows: 1 },
        ];
      }

      return [
        { id: 1, title: 'Mapa', cols: 2, rows: 2 },
        { id: 2, title: 'Novedades de enfermedades', cols: 2, rows: 1 },
        { id: 3, title: 'Card 3', cols: 1, rows: 2 },
        { id: 4, title: 'Card 4', cols: 1, rows: 1 },
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {}
}
