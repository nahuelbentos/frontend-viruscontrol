import { LayoutModule } from '@angular/cdk/layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { Home2Component } from './home2.component';

describe('Home2Component', () => {
  let component: Home2Component;
  let fixture: ComponentFixture<Home2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Home2Component],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatCardModule,
        MatGridListModule,
        MatIconModule,
        MatMenuModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Home2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
