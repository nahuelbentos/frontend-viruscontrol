import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarExamenComponent } from './solicitar-examen.component';

describe('SolicitarExamenComponent', () => {
  let component: SolicitarExamenComponent;
  let fixture: ComponentFixture<SolicitarExamenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitarExamenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitarExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
