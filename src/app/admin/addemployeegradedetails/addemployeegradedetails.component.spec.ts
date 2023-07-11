import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddemployeegradedetailsComponent } from './addemployeegradedetails.component';

describe('AddemployeegradedetailsComponent', () => {
  let component: AddemployeegradedetailsComponent;
  let fixture: ComponentFixture<AddemployeegradedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddemployeegradedetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddemployeegradedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
