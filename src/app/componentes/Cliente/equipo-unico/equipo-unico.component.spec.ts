import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipoUnicoComponent } from './equipo-unico.component';

describe('EquipoUnicoComponent', () => {
  let component: EquipoUnicoComponent;
  let fixture: ComponentFixture<EquipoUnicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EquipoUnicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EquipoUnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
