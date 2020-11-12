import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CampgroundComponent } from './campground.component';

describe('CampgroundComponent', () => {
  let component: CampgroundComponent;
  let fixture: ComponentFixture<CampgroundComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CampgroundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
