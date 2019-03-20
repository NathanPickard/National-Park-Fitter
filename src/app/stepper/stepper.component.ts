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
  foundCampgroundPark: any[];

  campgroundPark: any;

  campgroundParkCode: any;

  resultsFound = false;

  ngOnInit() {

    // this.stepperForm = new FormGroup({
    //   'firstCtrl': new FormControl(null, [Validators.required])
    // });


    this.firstFormGroup = this._formBuilder.group({

      wheelchairAccessCtrl: ['', Validators.required],
      internetCtrl: ['', Validators.required],
      rvAllowedCtrl: ['', Validators.required],
      rvMaxCtrl: ['', Validators.required],
      rvInfoCtrl: ['', Validators.required],
      cellPhoneInfoCtrl: ['', Validators.required],
      fireStoveCtrl: ['', Validators.required],
      additionalInfoCtrl: ['', Validators.required],
      adaCtrl: ['', Validators.required],
      accessRoadsCtrl: ['', Validators.required],
      trailerAllowedCtrl: ['', Validators.required],
      trailerMaxCtrl: ['', Validators.required],
      classificationsCtrl: ['', Validators.required]
    });

    this.secondFormGroup = this._formBuilder.group({

      trashRecyclingCtrl: ['', Validators.required],
      toiletsCtrl: ['', Validators.required],
      internetConnectivityCtrl: ['', Validators.required],
      showersCtrl: ['', Validators.required],
      cellPhoneReceptionCtrl: ['', Validators.required],
      laundryCtrl: ['', Validators.required],
      amphitheaterCtrl: ['', Validators.required],
      dumpStationCtrl: ['', Validators.required],
      campStoreCtrl: ['', Validators.required],
      staffVolunteerCtrl: ['', Validators.required],
      potableWatertCtrl: ['', Validators.required],
      iceAvailableForSaleCtrl: ['', Validators.required],
      firewoodForSaleCtrl: ['', Validators.required],
      foodStorageLockersCtrl: ['', Validators.required]
    });

    this.thirdFormGroup = this._formBuilder.group({
      weatherCtrl: ['', Validators.required],
      regulationsCtrl: ['', Validators.required],
      directionsCtrl: ['', Validators.required],
    });
  }


  onSubmitStepper() {
    // console.log(this.firstFormGroup.value.firstCtrl);
    return this.searchService.getCampgroundResults().subscribe(
      data => this.handleSuccess(data),
      error => this.handleError(error)
    );

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

    // this.campgroundPark = this.foundCampgrounds.parkCode;
    console.log(this.campgroundPark);

    console.log(this.foundCampgrounds.length);

    // if (this.firstFormGroup.value.firstCtrl == true) {

    for (let i = 0; i < this.foundCampgrounds.length; i++) {
      // if (this.foundCampgrounds[i].parkCode) {
      this.campgroundPark = this.foundCampgrounds[i].parkCode;
      console.log(this.campgroundPark);

      this.getParkName(this.campgroundPark);

      // return this.searchService.getCampgroundPark(this.campgroundPark).subscribe(
      //   data => this.handleCampgroundParkSuccess(data),
      //   error => this.handleError(error),
      // );

      // console.log(this.foundCampgrounds[i].parkCode);
    }
    // }
    // }
  }

  getParkName(campgroundPark) {
    return this.searchService.getCampgroundPark(this.campgroundPark).subscribe(
      data => this.handleCampgroundParkSuccess(data),
      error => this.handleError(error),
    );
  }

  handleCampgroundParkSuccess(data) {
    this.foundCampgroundPark = data.data;
    console.log(this.foundCampgroundPark);
  }

  handleError(error) {
    console.log(error);
  }


}
