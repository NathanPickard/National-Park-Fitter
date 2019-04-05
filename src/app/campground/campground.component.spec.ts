import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampgroundComponent } from './campground.component';

describe('CampgroundComponent', () => {
  let component: CampgroundComponent;
  let fixture: ComponentFixture<CampgroundComponent>;

  beforeEach(async(() => {
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
