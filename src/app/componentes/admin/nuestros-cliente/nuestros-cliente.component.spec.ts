import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuestrosClienteComponent } from './nuestros-cliente.component';

describe('NuestrosClienteComponent', () => {
  let component: NuestrosClienteComponent;
  let fixture: ComponentFixture<NuestrosClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NuestrosClienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NuestrosClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
