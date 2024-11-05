import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnvCorreoPage } from './env-correo.page';

describe('EnvCorreoPage', () => {
  let component: EnvCorreoPage;
  let fixture: ComponentFixture<EnvCorreoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvCorreoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
