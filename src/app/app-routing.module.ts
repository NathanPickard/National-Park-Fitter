import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { StepperComponent } from './stepper/stepper.component';
import { ParkComponent } from './park/park.component';
import { AboutComponent } from './about/about.component';

const appRoutes: Routes = [
  {
    path: '', component: StepperComponent
  },
  {
    path: '', component: ParkComponent
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
