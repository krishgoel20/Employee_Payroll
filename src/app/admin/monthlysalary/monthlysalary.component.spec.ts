import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlysalaryComponent } from './monthlysalary.component';

describe('MonthlysalaryComponent', () => {
  let component: MonthlysalaryComponent;
  let fixture: ComponentFixture<MonthlysalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlysalaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlysalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
