import { TestBed } from '@angular/core/testing';

import { UserPruebaService } from './user-prueba.service';

describe('UserPruebaService', () => {
  let service: UserPruebaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPruebaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
