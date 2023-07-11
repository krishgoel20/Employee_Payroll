import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddgradeComponent } from './addgrade.component';

describe('AddgradeComponent', () => {
  let component: AddgradeComponent;
  let fixture: ComponentFixture<AddgradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddgradeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddgradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
