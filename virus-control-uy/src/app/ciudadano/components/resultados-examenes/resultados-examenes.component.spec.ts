import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosExamenesComponent } from './resultados-examenes.component';

describe('ResultadosExamenesComponent', () => {
  let component: ResultadosExamenesComponent;
  let fixture: ComponentFixture<ResultadosExamenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadosExamenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadosExamenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
