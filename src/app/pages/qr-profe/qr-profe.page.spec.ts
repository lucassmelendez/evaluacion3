import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QrProfePage } from './qr-profe.page';

describe('QrProfePage', () => {
  let component: QrProfePage;
  let fixture: ComponentFixture<QrProfePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QrProfePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
