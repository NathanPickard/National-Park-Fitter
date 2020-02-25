import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SearchService } from '../shared/search.service';

@Component({
  selector: 'app-campground',
  templateUrl: './campground.component.html',
  styleUrls: ['./campground.component.css']
})
export class CampgroundComponent implements OnInit {

  accessibilityFormGroup: FormGroup;
  amenitiesFormGroup: FormGroup;
  generalInfoFormGroup: FormGroup;

  searching = false;
  stepperSubmitted = false;
  resultsFound = false;

  foundCampgrounds: any[];
  foundCampgroundImages: any;
  foundCampgroundPark: any[];

  campgroundParkArray: any[] = [];
  campgroundPark: any;

  campgroundLatLong: any;
  campgroundLat: any;
  campgroundLong: any;
  longStr: any;
  resultsStepperLatLongArray: any;

  constructor(private _formBuilder: FormBuilder,
    private searchService: SearchService) { }


  ngOnInit() {
    this.accessibilityFormGroup = this._formBuilder.group({

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

    this.amenitiesFormGroup = this._formBuilder.group({

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

    this.generalInfoFormGroup = this._formBuilder.group({
      weatherCtrl: ['', Validators.required],
      regulationsCtrl: ['', Validators.required],
      directionsCtrl: ['', Validators.required],
    });
  }

  onSubmitStepper() {
    this.stepperSubmitted = true;

    this.getCampgroundData();
    console.log(this.accessibilityFormGroup.value);
  }

  getCampgroundData() {
    this.searching = true;
    return this.searchService.getCampgroundResults().subscribe(
      data => this.handleSuccess(data),
      error => this.handleError(error),
      () => this.searching = false
    );
  }

  getParkName(campgroundPark) {
    return this.searchService.getCampgroundPark(this.campgroundPark).subscribe(
      data => this.handleCampgroundParkSuccess(data),
      error => this.handleError(error),
    );
  }

  handleSuccess(data) {
    this.resultsFound = true;

    this.resultsStepperLatLongArray = [];
    this.foundCampgrounds = data.data;
    console.log(this.foundCampgrounds);

    // this.campgroundPark = this.foundCampgrounds.parkCode;
    // console.log(this.campgroundPark);

    for (let i = 0; i < this.foundCampgrounds.length; i++) {
      this.foundCampgroundImages = this.foundCampgrounds[i].images;
      this.campgroundPark = this.foundCampgrounds[i].parkCode;
      // console.log(this.campgroundPark);

      this.campgroundLatLong = this.foundCampgrounds[i].latLong;
      this.longStr = this.campgroundLatLong.search('lng:')
      this.campgroundLat = this.campgroundLatLong.substr(5, 5);
      this.campgroundLong = this.campgroundLatLong.slice(this.longStr + 4, this.longStr + 12);

      console.log("Latitude: " + this.campgroundLat);
      console.log("Longitude: " + this.campgroundLong);

      this.resultsStepperLatLongArray.push({
        lat: this.campgroundLat,
        long: this.campgroundLong,
        fullName: this.foundCampgrounds[i].name,
        // url: this.foundCampgrounds[i].url
      });

      console.log(this.resultsStepperLatLongArray);

      this.getParkName(this.campgroundPark);
    }
  }

  handleCampgroundParkSuccess(data) {
    this.foundCampgroundPark = data.data;

    console.log(this.foundCampgroundPark);

    // this.foundCampgroundParkfullname.push(this.campgroundParkArray);

    // this.campgroundParkArray.push(this.foundCampgroundPark);
    // this.foundCampgroundPark.push(this.campgroundParkArray);

    // console.log(this.campgroundParkArray);

    for (let i = 0; i < this.foundCampgroundPark.length; i++) {

      this.campgroundParkArray.push(this.foundCampgroundPark[i].fullName);
      console.log(this.campgroundParkArray);
      // console.log(this.foundCampgroundPark[i].fullName);

      // this.foundCampgrounds.push(this.foundCampgroundPark[i].fullname);
      // this.foundCampgroundPark[i].fullName.push(this.campgroundParkArray);

      // console.log(this.foundCampgrounds);
      // console.log(this.campgroundParkArray);
    }
  }

  handleError(error) {
    console.log(error);
  }

}
