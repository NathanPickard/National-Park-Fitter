import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { SearchService } from '../search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  accessibilityFormGroup: FormGroup;
  amenitiesFormGroup: FormGroup;
  generalInfoFormGroup: FormGroup;

  stateFormGroup: FormGroup;
  generalParkInfoFormGroup: FormGroup;

  searching: boolean = false;
  parksFound: boolean = false;

  constructor(private _formBuilder: FormBuilder,
    private searchService: SearchService) { }


  foundCampgrounds: any[];
  foundCampgroundPark: any[];

  foundParks: any[];
  foundSearchParks: any[];
  foundParkName: any;

  foundNewsReleases: any[];
  foundNextNewsReleases: any[];
  nextSetNewsRelease: any = 5;

  resultsFound: boolean = false;
  newsFound: boolean = false;
  searchSubmitted: boolean = false;

  campgroundParkArray: any[] = [name];

  campgroundPark: any;

  campgroundParkCode: any;
  parkCode: any;
  newsReleaseParkCode: any;

  searchParkForm: FormGroup;
  searchQuery: string;


  ngOnInit() {

    this.searchParkForm = new FormGroup({
      'searchQuery': new FormControl('', [Validators.required])
    });

    this.getNewsReleases();

    this.stateFormGroup = this._formBuilder.group({
      stateCtrl: ['', Validators.required]
    });

    this.generalParkInfoFormGroup = this._formBuilder.group({
      parkInfoCtrl: ['', Validators.required]
    });

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

  searchParks() {
    this.searchSubmitted = true;
    this.searching = true;
    const query = this.searchParkForm.value.searchQuery;

    return this.searchService.searchParks(query).subscribe(
      data => this.handleSearchParkSuccess(data),
      error => this.handleError(error),
      () => this.searching = false
    );
  }


  getNewsReleases() {
    return this.searchService.getLatestNewsReleases().subscribe(
      data => this.handleNewsReleaseSuccess(data),
      error => this.handleError(error)
    );
  }

  onSubmitStepper() {
    this.getCampgroundData();
    this.getParkData();
  }

  getCampgroundData() {
    return this.searchService.getCampgroundResults().subscribe(
      data => this.handleSuccess(data),
      error => this.handleError(error)
    );
  }

  getParkData() {
    return this.searchService.getParkResults().subscribe(
      data => this.handleParkSuccess(data),
      error => this.handleError(error)
    );
  }

  getParkName(campgroundPark) {
    return this.searchService.getCampgroundPark(this.campgroundPark).subscribe(
      data => this.handleCampgroundParkSuccess(data),
      error => this.handleError(error)
    );
  }

  getNameFromParkCode(parkCode) {
    return this.searchService.getParkName(parkCode).subscribe(
      data => this.handleParkNameSuccess(data),
      error => this.handleError(error)
    );
  }

  getNextNewsReleases() {
    this.nextSetNewsRelease = this.nextSetNewsRelease + 5;
    console.log(this.nextSetNewsRelease);
    return this.searchService.getNextLatestNewsReleases(this.nextSetNewsRelease).subscribe(
      data => this.handleNextNewsReleaseSuccess(data),
      error => this.handleError(error)
    );
  }

  handleNextNewsReleaseSuccess(data) {
    this.foundNextNewsReleases = data.data;
    console.log(this.foundNextNewsReleases);
  }

  handleParkNameSuccess(data) {
    this.foundParkName = data.data[0].fullName;
    console.log(this.foundNewsReleases);
    // console.log(this.foundParkName);
    // this.foundNewsReleases.push(this.foundParkName);
  }

  handleNewsReleaseSuccess(data) {
    this.newsFound = true;
    this.foundNewsReleases = data.data;
    console.log(this.foundNewsReleases);

    // for (let i = 0; i < this.foundNewsReleases.length; i++) {
    //   this.newsReleaseParkCode = this.foundNewsReleases[i].parkCode;
    //   console.log(this.newsReleaseParkCode);
    //   this.getNameFromParkCode(this.newsReleaseParkCode);
    //   console.log(this.foundParkName);



    // this.foundNewsReleases.push(this.foundParkName);
    // console.log(this.foundNewsReleases);
    // }
  }

  handleSearchParkSuccess(data) {
    this.parksFound = true;
    this.foundSearchParks = data.data;

    console.log(this.foundSearchParks);
  }

  handleSuccess(data) {
    // this.foundYosemiteCampgrounds = data;
    this.resultsFound = true;

    this.foundCampgrounds = data.data;
    console.log(this.foundCampgrounds);

    // this.campgroundPark = this.foundCampgrounds.parkCode;
    // console.log(this.campgroundPark);

    // if (this.firstFormGroup.value.firstCtrl == true) {

    for (let i = 0; i < this.foundCampgrounds.length; i++) {
      this.campgroundPark = this.foundCampgrounds[i].parkcode;
      // console.log(this.campgroundPark);

      this.getParkName(this.campgroundPark);
    }
  }

  handleParkSuccess(data) {
    this.resultsFound = true;

    this.foundParks = data.data;
    console.log(this.foundParks);
  }

  handleCampgroundParkSuccess(data) {
    this.foundCampgroundPark = data.data;

    // console.log(this.foundCampgroundPark);

    // this.campgroundParkArray.push(this.foundCampgroundPark);
    // this.foundCampgroundPark.push(this.campgroundParkArray);

    // console.log(this.campgroundParkArray);

    for (let i = 0; i < this.foundCampgroundPark.length; i++) {
      // console.log(this.foundCampgroundPark[i].fullname);

      this.campgroundParkArray.push(this.foundCampgroundPark[i].fullname);
      // this.foundCampgrounds.push(this.foundCampgroundPark[i].fullname);

      // console.log(this.foundCampgrounds);
      console.log(this.campgroundParkArray);
    }

    // this.campgroundParkArray.push('24');

    // this.foundCampgroundPark[i].fullName.push(this.campgroundParkArray);

    // console.log(this.campgroundParkArray);

    // this.foundCampgroundPark.unshift(this.campgroundParkArray);

    // console.log(this.foundCampgroundPark);
  }

  handleError(error) {
    console.log(error);
  }


}
