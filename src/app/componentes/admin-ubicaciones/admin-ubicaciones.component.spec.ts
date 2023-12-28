import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUbicacionesComponent } from './admin-ubicaciones.component';

describe('AdminUbicacionesComponent', () => {
  let component: AdminUbicacionesComponent;
  let fixture: ComponentFixture<AdminUbicacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminUbicacionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminUbicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
