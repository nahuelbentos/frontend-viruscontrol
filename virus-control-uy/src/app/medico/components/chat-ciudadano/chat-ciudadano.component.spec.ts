import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatCiudadanoComponent } from './chat-ciudadano.component';

describe('ChatCiudadanoComponent', () => {
  let component: ChatCiudadanoComponent;
  let fixture: ComponentFixture<ChatCiudadanoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatCiudadanoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatCiudadanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
