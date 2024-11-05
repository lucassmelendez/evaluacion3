import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PorAsistenciaCursoPage } from './por-asistencia-curso.page';

describe('PorAsistenciaCursoPage', () => {
  let component: PorAsistenciaCursoPage;
  let fixture: ComponentFixture<PorAsistenciaCursoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PorAsistenciaCursoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
