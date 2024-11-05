import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MateriaAlumnPage } from './materia-alumn.page';

describe('MateriaAlumnPage', () => {
  let component: MateriaAlumnPage;
  let fixture: ComponentFixture<MateriaAlumnPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriaAlumnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
