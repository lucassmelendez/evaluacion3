import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeProfePage } from './home-profe.page';

describe('HomeProfePage', () => {
  let component: HomeProfePage;
  let fixture: ComponentFixture<HomeProfePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeProfePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
