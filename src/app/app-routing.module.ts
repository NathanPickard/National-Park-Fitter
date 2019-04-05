import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { StepperComponent } from './stepper/stepper.component';
import { ParkComponent } from './park/park.component';
import { CampgroundComponent } from './campground/campground.component';
import { AboutComponent } from './about/about.component';

const appRoutes: Routes = [
  {
    path: '', component: StepperComponent
  },
  {
    path: 'park', component: ParkComponent
  },
  {
    path: 'campground', component: CampgroundComponent
  },
  {
    path: 'about', component: AboutComponent
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
