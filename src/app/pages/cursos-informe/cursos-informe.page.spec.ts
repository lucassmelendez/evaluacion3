import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CursosInformePage } from './cursos-informe.page';

describe('CursosInformePage', () => {
  let component: CursosInformePage;
  let fixture: ComponentFixture<CursosInformePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CursosInformePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
