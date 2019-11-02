import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { AboutComponent } from './about/about.component';
import { AmenitiesComponent } from './campground/amenities/amenities.component';
import { AccessibilityComponent } from './campground/accessibility/accessibility.component';
import { ParkComponent } from './park/park.component';
import { ParkStepperComponent } from './park/park-stepper/park-stepper.component';
import { CampgroundComponent } from './campground/campground.component';

import { AppRoutingModule } from './app-routing.module';
import { SearchService } from './shared/search.service';

// import { NgImageSliderModule } from 'ng-image-slider';
// import { CarouselModule, WavesModule } from 'angular-bootstrap-md';
import { SlideshowModule } from 'ng-simple-slideshow';
// import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
// import { NgxImageGalleryModule } from 'ngx-image-gallery';

import { MaterialModule } from './shared/material.module';

import { MatIconRegistry } from '@angular/material/icon';

import { AgmCoreModule } from '@agm/core';

import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    AboutComponent,
    AmenitiesComponent,
    AccessibilityComponent,
    ParkComponent,
    CampgroundComponent,
    ParkStepperComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    ScrollingModule,
    // NgbCarouselModule,
    // NgxImageGalleryModule,
    // NgImageSliderModule,
    // CarouselModule.forRoot(),
    // WavesModule.forRoot(),
    SlideshowModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB6vjKMU0wxBezpYg6PuYPDFOP0k3JPi_o'
    })
  ],
  providers: [SearchService,
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    // matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('https://chan4077.github.io/res/mdi.svg'));
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg'));
  }
}
