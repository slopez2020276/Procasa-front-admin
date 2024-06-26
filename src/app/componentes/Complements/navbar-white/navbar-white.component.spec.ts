import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarWhiteComponent } from './navbar-white.component';

describe('NavbarWhiteComponent', () => {
  let component: NavbarWhiteComponent;
  let fixture: ComponentFixture<NavbarWhiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarWhiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarWhiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
