import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlechaComponent } from './flecha.component';

describe('FlechaComponent', () => {
  let component: FlechaComponent;
  let fixture: ComponentFixture<FlechaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlechaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
