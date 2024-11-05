import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PresenteAlumnoPage } from './presente-alumno.page';

describe('PresenteAlumnoPage', () => {
  let component: PresenteAlumnoPage;
  let fixture: ComponentFixture<PresenteAlumnoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PresenteAlumnoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
