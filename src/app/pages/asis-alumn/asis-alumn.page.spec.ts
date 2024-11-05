import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsisAlumnPage } from './asis-alumn.page';

describe('AsisAlumnPage', () => {
  let component: AsisAlumnPage;
  let fixture: ComponentFixture<AsisAlumnPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AsisAlumnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
