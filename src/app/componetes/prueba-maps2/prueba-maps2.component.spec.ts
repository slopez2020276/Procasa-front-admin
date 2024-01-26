import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaMaps2Component } from './prueba-maps2.component';

describe('PruebaMaps2Component', () => {
  let component: PruebaMaps2Component;
  let fixture: ComponentFixture<PruebaMaps2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PruebaMaps2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PruebaMaps2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
