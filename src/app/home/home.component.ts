/// <reference types="@types/googlemaps" />

import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, UntypedFormControl } from '@angular/forms';

import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';

import { SearchService } from '../shared/search.service';

// import { FitBoundsAccessor } from '@agm/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // @ViewChild('gmap', { static: true }) gmapElement: any;
  // map: google.maps.Map;

  options: google.maps.MapOptions = {
    center: { lat: 45.5212, lng: -122.664 },
    mapTypeId: 'roadmap',
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  }

  accessibilityFormGroup: UntypedFormGroup;
  amenitiesFormGroup: UntypedFormGroup;
  generalInfoFormGroup: UntypedFormGroup;

  stateFormGroup: UntypedFormGroup;
  generalParkInfoFormGroup: UntypedFormGroup;

  searching = false;

  searchingForNews = false;
  loadingMoreNews = false;
  parksFound = false;

  parkSearchResults: any;

  constructor(private _formBuilder: UntypedFormBuilder,
    private searchService: SearchService) { }

  foundCampgrounds: any[];
  foundCampgroundPark: any[];

  foundParks: any[];
  foundSearchParks: any[];
  foundParkName: any;

  foundNewsReleases: any[];
  foundNextNewsReleases: any[];
  nextSetNewsRelease: any = 5;

  resultsFound = false;
  newsFound = false;
  searchSubmitted = false;
  noParksFound = false;

  campgroundParkArray: any[] = [name];
  campgroundPark: any;

  campgroundParkCode: any;
  parkCode: any;
  newsReleaseParkCode: any;

  searchParkForm: UntypedFormGroup;
  searchQuery: string;

  parkLatLong: any;
  parkLat: any;
  parkLong: any;
  searchResultsLatLongArray: any;

  filteredParks: any[];
  isLoading = false;
  errorMessage: string;

  ngOnInit() {

    var mapProp = {
      center: new google.maps.LatLng(45.5212, -122.664),
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    this.searchParkForm = new UntypedFormGroup({
      searchQuery: new UntypedFormControl('')
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

    this.searchParkForm.get('searchQuery').valueChanges
      .pipe(debounceTime(500),
        tap(() => {
          this.errorMessage = '';
          this.filteredParks = [];
          this.isLoading = true;
        }),
        switchMap(value => this.searchService.searchParks(value)
          .pipe(finalize(() => {
            this.isLoading = false;
          }),
          )
        )
      )
      .subscribe(data => {
        if (data !== undefined) {
          console.log('Got results');
          this.filteredParks = data.data;
          this.errorMessage = '';
        } else {
          this.errorMessage = data['Error'];
          console.log(data);
          this.filteredParks = data.data;
          console.log(this.filteredParks);
        }
        console.log(this.filteredParks);
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
    this.searchingForNews = true;
    return this.searchService.getLatestNewsReleases().subscribe(
      data => this.handleNewsReleaseSuccess(data),
      error => this.handleError(error),
      () => this.searchingForNews = false
    );
  }

  // onSubmitStepper() {
  //   this.getCampgroundData();
  //   this.getParkData();
  // }

  // getCampgroundData() {
  //   return this.searchService.getCampgroundResults().subscribe(
  //     data => this.handleSuccess(data),
  //     error => this.handleError(error)
  //   );
  // }

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
    this.loadingMoreNews = true;
    this.nextSetNewsRelease = this.nextSetNewsRelease + 5;
    console.log(this.nextSetNewsRelease);
    return this.searchService.getNextLatestNewsReleases(this.nextSetNewsRelease).subscribe(
      data => this.handleNextNewsReleaseSuccess(data),
      error => this.handleError(error),
      () => this.loadingMoreNews = false
    );
  }

  handleNextNewsReleaseSuccess(data) {
    for (let i = 0; i < data.data.length; i++) {
      this.foundNewsReleases.push(data.data[i]);
    }
  }

  handleParkNameSuccess(data) {
    this.foundParkName = data.data[0].fullName;
    console.log(this.foundNewsReleases);
    // this.foundNewsReleases.push(this.foundParkName);
  }

  handleNewsReleaseSuccess(data) {
    this.newsFound = true;
    this.foundNewsReleases = data.data;
    console.log(this.foundNewsReleases);
  }

  handleSearchParkSuccess(data) {

    this.searchResultsLatLongArray = [];

    this.foundSearchParks = data.data;

    if (this.foundSearchParks === undefined || this.foundSearchParks.length === 0) {
      console.log("no results found, try again");
      this.noParksFound = true;
    }
    else {
      this.parksFound = true;
      this.noParksFound = false;
    }

    for (let i = 0; i < this.foundSearchParks.length; i++) {
      this.parkLatLong = this.foundSearchParks[i].latLong;
      this.parkLat = this.parkLatLong.substr(4, 5);
      this.parkLong = this.parkLatLong.split("long:").pop();

      // this.searchResultsLatLongArray
      //   .push({
      //     lat: this.parkLat,
      //     long: this.parkLong,
      //     fullName: this.foundSearchParks[i].fullName,
      //     url: this.foundSearchParks[i].url
      //   });

      this.searchResultsLatLongArray
        .push({
          position: {
            lat: this.parkLat,
            lng: this.parkLong,
          },
          label: { },
          title: '',
          options: {
            animation: google.maps.Animation.BOUNCE
          }
        });
      console.log(this.searchResultsLatLongArray);
    }
    console.log(this.foundSearchParks);
  }

  handleSuccess(data) {
    this.resultsFound = true;
    this.foundCampgrounds = data.data;
    console.log(this.foundCampgrounds);

    // this.campgroundPark = this.foundCampgrounds.parkCode;

    for (let i = 0; i < this.foundCampgrounds.length; i++) {
      this.campgroundPark = this.foundCampgrounds[i].parkcode;
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
    // this.foundCampgroundPark[i].fullName.push(this.campgroundParkArray);
    // console.log(this.campgroundParkArray);
    // this.foundCampgroundPark.unshift(this.campgroundParkArray);
    // console.log(this.foundCampgroundPark);
  }

  handleError(error) {
    console.log(error);
  }

}
