import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMedicoComponent } from './chat-medico.component';

describe('ChatMedicoComponent', () => {
  let component: ChatMedicoComponent;
  let fixture: ComponentFixture<ChatMedicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatMedicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
