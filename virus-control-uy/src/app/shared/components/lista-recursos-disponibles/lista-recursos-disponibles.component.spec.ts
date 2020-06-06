import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRecursosDisponiblesComponent } from './lista-recursos-disponibles.component';

describe('ListaRecursosDisponiblesComponent', () => {
  let component: ListaRecursosDisponiblesComponent;
  let fixture: ComponentFixture<ListaRecursosDisponiblesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaRecursosDisponiblesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaRecursosDisponiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
