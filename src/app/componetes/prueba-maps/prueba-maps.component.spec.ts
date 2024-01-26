import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaMapsComponent } from './prueba-maps.component';

describe('PruebaMapsComponent', () => {
  let component: PruebaMapsComponent;
  let fixture: ComponentFixture<PruebaMapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PruebaMapsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PruebaMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
