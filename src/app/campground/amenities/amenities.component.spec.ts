import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AmenitiesComponent } from './amenities.component';

describe('AmenitiesComponent', () => {
  let component: AmenitiesComponent;
  let fixture: ComponentFixture<AmenitiesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AmenitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmenitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
