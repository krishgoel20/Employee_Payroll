import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewgradeComponent } from './addnewgrade.component';

describe('AddnewgradeComponent', () => {
  let component: AddnewgradeComponent;
  let fixture: ComponentFixture<AddnewgradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnewgradeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddnewgradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
