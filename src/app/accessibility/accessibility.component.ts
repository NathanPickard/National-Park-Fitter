import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-accessibility',
  templateUrl: './accessibility.component.html',
  styleUrls: ['./accessibility.component.css']
})
export class AccessibilityComponent implements OnInit {

  // @Input() foundCampgrounds: any[];
  // @Input() foundCampground: any[];
  foundCampgrounds: any[];

  accessibilityFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  // foundCampgrounds: any[];

  ngOnInit() {

    // this.accessibilityFormGroup = this._formBuilder.group({

    //   wheelchairAccessCtrl: ['', Validators.required],
    //   internetCtrl: ['', Validators.required],
    //   rvAllowedCtrl: ['', Validators.required],
    //   rvMaxCtrl: ['', Validators.required],
    //   rvInfoCtrl: ['', Validators.required],
    //   cellPhoneInfoCtrl: ['', Validators.required],
    //   fireStoveCtrl: ['', Validators.required],
    //   additionalInfoCtrl: ['', Validators.required],
    //   adaCtrl: ['', Validators.required],
    //   accessRoadsCtrl: ['', Validators.required],
    //   trailerAllowedCtrl: ['', Validators.required],
    //   trailerMaxCtrl: ['', Validators.required],
    //   classificationsCtrl: ['', Validators.required]
    // });
  }

}
