import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkStepperComponent } from './park-stepper.component';

describe('ParkStepperComponent', () => {
  let component: ParkStepperComponent;
  let fixture: ComponentFixture<ParkStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
