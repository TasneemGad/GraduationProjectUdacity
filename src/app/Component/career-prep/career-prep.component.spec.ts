import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerPrepComponent } from './career-prep.component';

describe('CareerPrepComponent', () => {
  let component: CareerPrepComponent;
  let fixture: ComponentFixture<CareerPrepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareerPrepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerPrepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
