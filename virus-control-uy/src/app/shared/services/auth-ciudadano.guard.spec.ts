import { TestBed } from '@angular/core/testing';

import { AuthCiudadanoGuard } from './auth-ciudadano.guard';

describe('AuthCiudadanoGuard', () => {
  let guard: AuthCiudadanoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthCiudadanoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
