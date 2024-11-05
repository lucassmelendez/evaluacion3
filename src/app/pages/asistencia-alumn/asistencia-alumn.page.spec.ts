import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsistenciaAlumnPage } from './asistencia-alumn.page';

describe('AsistenciaAlumnPage', () => {
  let component: AsistenciaAlumnPage;
  let fixture: ComponentFixture<AsistenciaAlumnPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AsistenciaAlumnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
