import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuscripcionRecursosComponent } from './suscripcion-recursos.component';

describe('SuscripcionRecursosComponent', () => {
  let component: SuscripcionRecursosComponent;
  let fixture: ComponentFixture<SuscripcionRecursosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuscripcionRecursosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuscripcionRecursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
