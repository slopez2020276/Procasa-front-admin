import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisionValorComponent } from './mision-valor.component';

describe('MisionValorComponent', () => {
  let component: MisionValorComponent;
  let fixture: ComponentFixture<MisionValorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MisionValorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MisionValorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
