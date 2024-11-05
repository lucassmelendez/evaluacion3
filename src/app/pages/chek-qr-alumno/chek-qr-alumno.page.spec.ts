import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChekQRAlumnoPage } from './chek-qr-alumno.page';

describe('ChekQRAlumnoPage', () => {
  let component: ChekQRAlumnoPage;
  let fixture: ComponentFixture<ChekQRAlumnoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChekQRAlumnoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
