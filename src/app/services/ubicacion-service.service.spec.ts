import { TestBed } from '@angular/core/testing';

import { UbicacionServiceService } from './ubicacion-service.service';

describe('UbicacionServiceService', () => {
  let service: UbicacionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UbicacionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
