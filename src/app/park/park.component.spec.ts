import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ParkComponent } from './park.component';

describe('ParkComponent', () => {
  let component: ParkComponent;
  let fixture: ComponentFixture<ParkComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
