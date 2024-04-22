import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiasMovilComponent } from './noticias-movil.component';

describe('NoticiasMovilComponent', () => {
  let component: NoticiasMovilComponent;
  let fixture: ComponentFixture<NoticiasMovilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoticiasMovilComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoticiasMovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
