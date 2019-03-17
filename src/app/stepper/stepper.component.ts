import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { SearchService } from './../search.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder,
    private searchService: SearchService) { }

  stepperForm: FormGroup;

  foundCampgrounds: any[];

  resultsFound = false;

  ngOnInit() {

    // this.stepperForm = new FormGroup({
    //   'firstCtrl': new FormControl(null, [Validators.required])
    // });


    this.firstFormGroup = this._formBuilder.group({
      wheelchairAccessCtrl: ['', Validators.required],
      internetCtrl: ['', Validators.required],
      rvAllowedCtrl: ['', Validators.required],
      cellPhoneInfoCtrl: ['', Validators.required],
      fireStoveCtrl: ['', Validators.required],
      rvMaxCtrl: ['', Validators.required],
      additionalInfoCtrl: ['', Validators.required],
      trailerMaxCtrl: ['', Validators.required],
      adaCtrl: ['', Validators.required],
      rvInfoCtrl: ['', Validators.required],
      accessRoadsCtrl: ['', Validators.required],
      trailerAllowedCtrl: ['', Validators.required],
      classificationsCtrl: ['', Validators.required]
    });

    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
  }


  onSubmitStepper() {
    // console.log(this.firstFormGroup.value.firstCtrl);
    console.log(this.firstFormGroup.value.wheelchairAccessCtrl);
    console.log(this.firstFormGroup.value.internetCtrl);
    return this.searchService.getCampgroundResults().subscribe(
      data => this.handleSuccess(data),
      error => this.handleError(error)
    );

    // console.log(this.firstFormGroup);
    // console.log(this.secondFormGroup);
    // console.log(this.thirdFormGroup);

    // if (this.firstFormGroup.value.firstCtrl == true) {
    // return this.searchService.getYosemiteCampgroundResults().subscribe(
    // return this.searchService.getCampgroundResults().subscribe(
    // data => this.handleSuccess(data),
    // error => this.handleError(error)
    // );
    // }
  }

  handleSuccess(data) {
    // this.foundYosemiteCampgrounds = data;
    this.resultsFound = true;
    console.log();

    this.foundCampgrounds = data.data;
    console.log(this.foundCampgrounds);

    console.log(this.foundCampgrounds.length);

    if (this.firstFormGroup.value.firstCtrl == true) {

      for (let i = 0; i < this.foundCampgrounds.length; i++) {
        if (this.foundCampgrounds[i].accessibility.wheelchairAccess) {
          console.log(this.foundCampgrounds[i].accessibility.wheelchairAccess);
        }
      }
    }
  }

  handleError(error) {
    console.log(error);
  }



}
