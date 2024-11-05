import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QRAlumnoPage } from './qr-alumno.page';

describe('QRAlumnoPage', () => {
  let component: QRAlumnoPage;
  let fixture: ComponentFixture<QRAlumnoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QRAlumnoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
