import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarVisitasComponent } from './listar-visitas.component';

describe('ListarVisitasComponent', () => {
  let component: ListarVisitasComponent;
  let fixture: ComponentFixture<ListarVisitasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarVisitasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarVisitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
