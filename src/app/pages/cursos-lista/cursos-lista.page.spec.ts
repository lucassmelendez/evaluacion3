import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CursosListaPage } from './cursos-lista.page';

describe('CursosListaPage', () => {
  let component: CursosListaPage;
  let fixture: ComponentFixture<CursosListaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CursosListaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
