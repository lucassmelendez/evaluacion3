import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CursosQRPage } from './cursos-qr.page';

describe('CursosQRPage', () => {
  let component: CursosQRPage;
  let fixture: ComponentFixture<CursosQRPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CursosQRPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
