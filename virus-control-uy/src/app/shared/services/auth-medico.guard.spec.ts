import { TestBed } from '@angular/core/testing';

import { AuthMedicoGuard } from './auth-medico.guard';

describe('AuthMedicoGuard', () => {
  let guard: AuthMedicoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthMedicoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
