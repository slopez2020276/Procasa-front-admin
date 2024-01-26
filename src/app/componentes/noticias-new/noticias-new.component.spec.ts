import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiasNEWComponent } from './noticias-new.component';

describe('NoticiasNEWComponent', () => {
  let component: NoticiasNEWComponent;
  let fixture: ComponentFixture<NoticiasNEWComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoticiasNEWComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoticiasNEWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
