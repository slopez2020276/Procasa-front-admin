import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiaUnicaComponent } from './noticia-unica.component';

describe('NoticiaUnicaComponent', () => {
  let component: NoticiaUnicaComponent;
  let fixture: ComponentFixture<NoticiaUnicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoticiaUnicaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoticiaUnicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
