import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudpersonaPage } from './crudpersona.page';

describe('CrudpersonaPage', () => {
  let component: CrudpersonaPage;
  let fixture: ComponentFixture<CrudpersonaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudpersonaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
