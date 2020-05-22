import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCiudadanoComponent } from './home-ciudadano.component';

describe('HomeCiudadanoComponent', () => {
  let component: HomeCiudadanoComponent;
  let fixture: ComponentFixture<HomeCiudadanoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeCiudadanoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCiudadanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
