import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SearchService } from '../shared/search.service';

export interface State {
  name: string;
  code: string;
  flag: string;
}

export interface StateGroup {
  name: string;
  state: State[];
}

export interface IImage {
  url: string | null;
  href?: string;
  clickAction?: Function;
  caption?: string;
  title?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  backgroundRepeat?: string;
}

@Component({
  selector: 'app-campground',
  templateUrl: './campground.component.html',
  styleUrls: ['./campground.component.css']
})
export class CampgroundComponent implements OnInit {

  stateFormGroup: FormGroup;
  accessibilityFormGroup: FormGroup;
  amenitiesFormGroup: FormGroup;
  generalInfoFormGroup: FormGroup;

  stateQuery: any;
  queryString: any;
  queriesArray: any[];
  query: any;

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
  campgroundFees: any;
  chipsArray: any[];

  stateGroups: StateGroup[] = [
    {
      name: 'State',
      state: [
        {
          name: 'Alabama',
          code: 'AL',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Alabama.svg'
        },
        {
          name: 'Alaska',
          code: 'AK',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/e/e6/Flag_of_Alaska.svg'
        },
        {
          name: 'Arizona',
          code: 'AZ',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arizona.svg'
        },
        {
          name: 'Arkansas',
          code: 'AR',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
        },
        {
          name: 'California',
          code: 'CA',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
        },
        {
          name: 'Colorado',
          code: 'CO',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/4/46/Flag_of_Colorado.svg'
        },
        {
          name: 'Connecticut',
          code: 'CT',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/9/96/Flag_of_Connecticut.svg'
        },
        {
          name: 'Delaware',
          code: 'DE',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/c/c6/Flag_of_Delaware.svg'
        },
        {
          name: 'Florida',
          code: 'FL',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
        },
        {
          name: 'Georgia',
          code: 'GA',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/5/54/Flag_of_Georgia_%28U.S._state%29.svg'
        },
        {
          name: 'Hawaii',
          code: 'HI',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/e/ef/Flag_of_Hawaii.svg'
        },
        {
          name: 'Idaho',
          code: 'ID',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_Idaho.svg'
        },
        {
          name: 'Illinois',
          code: 'IL',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_Illinois.svg'
        },
        {
          name: 'Indiana',
          code: 'IN',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/a/ac/Flag_of_Indiana.svg'
        },
        {
          name: 'Iowa',
          code: 'IA',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/a/aa/Flag_of_Iowa.svg'
        },
        {
          name: 'Kansas',
          code: 'KS',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/d/da/Flag_of_Kansas.svg'
        },
        {
          name: 'Kentucky',
          code: 'KY',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/8/8d/Flag_of_Kentucky.svg'
        },
        {
          name: 'Louisiana',
          code: 'LA',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/e/e0/Flag_of_Louisiana.svg'
        },
        {
          name: 'Maine',
          code: 'ME',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/3/35/Flag_of_Maine.svg'
        },
        {
          name: 'Maryland',
          code: 'MD',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/a/a0/Flag_of_Maryland.svg'
        },
        {
          name: 'Massachusetts',
          code: 'MA',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/f/f2/Flag_of_Massachusetts.svg'
        },
        {
          name: 'Michigan',
          code: 'MI',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/b/b5/Flag_of_Michigan.svg'
        },
        {
          name: 'Minnesota',
          code: 'MN',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/b/b9/Flag_of_Minnesota.svg'
        },
        {
          name: 'Mississippi',
          code: 'MS',
          flag:
            'https://commons.wikimedia.org/wiki/File:Flag_of_Mississippi.svg'
        },
        {
          name: 'Missouri',
          code: 'MO',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/5/5a/Flag_of_Missouri.svg'
        },
        {
          name: 'Montana',
          code: 'MT',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_Montana.svg'
        },
        {
          name: 'Nebraska',
          code: 'NE',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/4/4d/Flag_of_Nebraska.svg'
        },
        {
          name: 'Nevada',
          code: 'NV',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/f/f1/Flag_of_Nevada.svg'
        },
        {
          name: 'New Hampshire',
          code: 'NH',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/2/28/Flag_of_New_Hampshire.svg'
        },
        {
          name: 'New Jersey',
          code: 'NJ',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/9/92/Flag_of_New_Jersey.svg'
        },
        {
          name: 'New Mexico',
          code: 'NM',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_New_Mexico.svg'
        },
        {
          name: 'New York',
          code: 'NY',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_New_York.svg'
        },
        {
          name: 'North Carolina',
          code: 'NC',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/b/bb/Flag_of_North_Carolina.svg'
        },
        {
          name: 'North Dakota',
          code: 'ND',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/e/ee/Flag_of_North_Dakota.svg'
        },
        {
          name: 'Ohio',
          code: 'OH',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/4/4c/Flag_of_Ohio.svg'
        },
        {
          name: 'Oklahoma',
          code: 'OK',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/6/6e/Flag_of_Oklahoma.svg'
        },
        {
          name: 'Oregon',
          code: 'OR',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/b/b9/Flag_of_Oregon.svg'
        },
        {
          name: 'Pennsylvania',
          code: 'PA',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Pennsylvania.svg'
        },
        {
          name: 'Rhode Island',
          code: 'RI',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Rhode_Island.svg'
        },
        {
          name: 'South Carolina',
          code: 'SC',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/6/69/Flag_of_South_Carolina.svg'
        },
        {
          name: 'South Dakota',
          code: 'SD',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_South_Dakota.svg'
        },
        {
          name: 'Tennessee',
          code: 'TN',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Tennessee.svg'
        },
        {
          name: 'Texas',
          code: 'TX',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
        },
        {
          name: 'Utah',
          code: 'UT',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/f/f6/Flag_of_Utah.svg'
        },
        {
          name: 'Vermont',
          code: 'VT',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Vermont.svg'
        },
        {
          name: 'Virginia',
          code: 'VA',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/4/47/Flag_of_Virginia.svg'
        },
        {
          name: 'Washington',
          code: 'WA',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/5/54/Flag_of_Washington.svg'
        },
        {
          name: 'West Virginia',
          code: 'WV',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/2/22/Flag_of_West_Virginia.svg'
        },
        {
          name: 'Wisconsin',
          code: 'WI',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/2/22/Flag_of_Wisconsin.svg'
        },
        {
          name: 'Wyoming',
          code: 'WY',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Wyoming.svg'
        }
      ]
    },
    {
      name: 'Commonwealth/Territory',
      state: [
        {
          name: 'American Samoa',
          code: 'AS',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/8/87/Flag_of_American_Samoa.svg'
        },
        {
          name: 'District of Columbia',
          code: 'DC',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/d/d4/Flag_of_the_District_of_Columbia.svg'
        },
        {
          name: 'Guam',
          code: 'GU',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/0/07/Flag_of_Guam.svg'
        },
        {
          name: 'Northern Mariana Islands',
          code: 'MP',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/e/e0/Flag_of_the_Northern_Mariana_Islands.svg'
        },
        {
          name: 'Puerto Rico',
          code: 'PR',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/2/28/Flag_of_Puerto_Rico.svg'
        },
        {
          name: 'United States Virgin Islands',
          code: 'VI',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/f/f8/Flag_of_the_United_States_Virgin_Islands.svg'
        }
      ]
    }
  ];

  constructor(private _formBuilder: FormBuilder,
    private searchService: SearchService) { }


  ngOnInit() {
    this.stateFormGroup = this._formBuilder.group({
      stateCtrl: ['', Validators.required]
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

  onSubmitStepper() {
    this.chipsArray = [];
    this.stepperSubmitted = true;

    this.chipsArray.push(this.stateFormGroup.value.stateCtrl.name);
    this.getCampgroundData();
    console.log(this.accessibilityFormGroup.value);
  }

  getCampgroundData() {
    this.searching = true;

    if (this.stateFormGroup.value.stateCtrl.code) {
      this.stateQuery = this.stateFormGroup.value.stateCtrl.code;
    }

    if (this.stateQuery !== undefined) {
      // this.queryString = this.queriesArray.toString();

      return this.searchService.getCampgroundResults(this.stateQuery)
        .subscribe(
          data => this.handleSuccess(data),
          error => this.handleError(error),
          () => this.searching = false
        );
    }
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
    this.campgroundFees = [];

    this.foundCampgrounds = data.data;
    console.log(this.foundCampgrounds);

    // this.campgroundPark = this.foundCampgrounds.parkCode;
    // console.log(this.campgroundPark);

    for (let i = 0; i < this.foundCampgrounds.length; i++) {
      this.foundCampgroundImages = this.foundCampgrounds[i].images;
      this.campgroundFees = this.foundCampgrounds[i].fees;
      this.campgroundPark = this.foundCampgrounds[i].parkCode;
      // console.log(this.campgroundPark);

      this.campgroundLatLong = this.foundCampgrounds[i].latLong;
      this.longStr = this.campgroundLatLong.search('lng:');
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
      console.log(this.campgroundFees);
      console.log(this.foundCampgroundImages);

      // for (let j = 0; j < this.foundCampgrounds[i].fees.length; j++) {
      //   console.log(this.foundCampgrounds[i].fees[j]);
      //   this.campgroundFees.push({
      //     cost: this.foundCampgrounds[i].fees[j].cost,
      //     description: this.foundCampgrounds[i].fees[j].description,
      //     title: this.foundCampgrounds[i].fees[j].title
      //     // this.foundCampgrounds[i].fees[j]
      //   });
      // }

      // console.log('CAMPGROUND FEES: ' + this.campgroundFees);

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
    }
  }

  generateArray(obj) {
    return Object.keys(obj).map((key) => { return obj[key] });
  }

  handleError(error) {
    console.log(error);
  }

}
