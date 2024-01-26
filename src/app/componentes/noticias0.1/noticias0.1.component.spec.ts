import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Noticias01Component } from './noticias0.1.component';

describe('Noticias01Component', () => {
  let component: Noticias01Component;
  let fixture: ComponentFixture<Noticias01Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Noticias01Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Noticias01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
