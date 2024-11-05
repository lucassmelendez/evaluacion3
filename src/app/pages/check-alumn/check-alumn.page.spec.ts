import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckAlumnPage } from './check-alumn.page';

describe('CheckAlumnPage', () => {
  let component: CheckAlumnPage;
  let fixture: ComponentFixture<CheckAlumnPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckAlumnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
