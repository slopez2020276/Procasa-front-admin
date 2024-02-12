import { TestBed } from '@angular/core/testing';

import { UneteEquipoService } from './unete-equipo.service';

describe('UneteEquipoService', () => {
  let service: UneteEquipoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UneteEquipoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
