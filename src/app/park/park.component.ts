import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { SearchService } from './../search.service';

export interface State {
  name: string;
  code: string;
  flag: string;
}

export interface StateGroup {
  name: string;
  state: State[];
}

@Component({
  selector: 'app-park',
  templateUrl: './park.component.html',
  styleUrls: ['./park.component.css']
})
export class ParkComponent implements OnInit {

  stateFormGroup: FormGroup;
  designationFormGroup: FormGroup;
  generalParkInfoFormGroup: FormGroup;

  stateQuery: any;
  query: any;

  selectedState: string;

  foundParks: any[];
  foundPark: any;

  stepperSubmitted: boolean = false;
  resultsFound: boolean = false;

  imageObject: Array<object> = [{
    image: ''

  }]

  stateGroups: StateGroup[] = [
    {
      name: 'State',
      state: [
        { name: 'Alabama', code: 'AL', flag: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Alabama.svg' },
        { name: 'Alaska', code: 'AK', flag: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Flag_of_Alaska.svg' },
        { name: 'Arizona', code: 'AZ', flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arizona.svg' },
        { name: 'Arkansas', code: 'AR', flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg' },
        { name: 'California', code: 'CA', flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg' },
        { name: 'Colorado', code: 'CO', flag: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Flag_of_Colorado.svg' },
        { name: 'Connecticut', code: 'CT', flag: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Flag_of_Connecticut.svg' },
        { name: 'Delaware', code: 'DE', flag: 'https://upload.wikimedia.org/wikipedia/commons/c/c6/Flag_of_Delaware.svg' },
        { name: 'Florida', code: 'FL', flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg' },
        { name: 'Georgia', code: 'GA', flag: 'https://upload.wikimedia.org/wikipedia/commons/5/54/Flag_of_Georgia_%28U.S._state%29.svg' },
        { name: 'Hawaii', code: 'HI', flag: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Flag_of_Hawaii.svg' },
        { name: 'Idaho', code: 'ID', flag: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_Idaho.svg' },
        { name: 'Illinois', code: 'IL', flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_Illinois.svg' },
        { name: 'Indiana', code: 'IN', flag: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Flag_of_Indiana.svg' },
        { name: 'Iowa', code: 'IA', flag: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Flag_of_Iowa.svg' },
        { name: 'Kansas', code: 'KS', flag: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Flag_of_Kansas.svg' },
        { name: 'Kentucky', code: 'KY', flag: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Flag_of_Kentucky.svg' },
        { name: 'Louisiana', code: 'LA', flag: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Flag_of_Louisiana.svg' },
        { name: 'Maine', code: 'ME', flag: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Flag_of_Maine.svg' },
        { name: 'Maryland', code: 'MD', flag: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Flag_of_Maryland.svg' },
        { name: 'Massachusetts', code: 'MA', flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Flag_of_Massachusetts.svg' },
        { name: 'Michigan', code: 'MI', flag: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Flag_of_Michigan.svg' },
        { name: 'Minnesota', code: 'MN', flag: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Flag_of_Minnesota.svg' },
        { name: 'Mississippi', code: 'MS', flag: 'https://commons.wikimedia.org/wiki/File:Flag_of_Mississippi.svg' },
        { name: 'Missouri', code: 'MO', flag: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Flag_of_Missouri.svg' },
        { name: 'Montana', code: 'MT', flag: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_Montana.svg' },
        { name: 'Nebraska', code: 'NE', flag: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Flag_of_Nebraska.svg' },
        { name: 'Nevada', code: 'NV', flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Flag_of_Nevada.svg' },
        { name: 'New Hampshire', code: 'NH', flag: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Flag_of_New_Hampshire.svg' },
        { name: 'New Jersey', code: 'NJ', flag: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Flag_of_New_Jersey.svg' },
        { name: 'New Mexico', code: 'NM', flag: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_New_Mexico.svg' },
        { name: 'New York', code: 'NY', flag: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_New_York.svg' },
        { name: 'North Carolina', code: 'NC', flag: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Flag_of_North_Carolina.svg' },
        { name: 'North Dakota', code: 'ND', flag: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Flag_of_North_Dakota.svg' },
        { name: 'Ohio', code: 'OH', flag: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Flag_of_Ohio.svg' },
        { name: 'Oklahoma', code: 'OK', flag: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Flag_of_Oklahoma.svg' },
        { name: 'Oregon', code: 'OR', flag: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Flag_of_Oregon.svg' },
        { name: 'Pennsylvania', code: 'PA', flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Pennsylvania.svg' },
        { name: 'Rhode Island', code: 'RI', flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Rhode_Island.svg' },
        { name: 'South Carolina', code: 'SC', flag: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Flag_of_South_Carolina.svg' },
        { name: 'South Dakota', code: 'SD', flag: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_South_Dakota.svg' },
        { name: 'Tennessee', code: 'TN', flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Tennessee.svg' },
        { name: 'Texas', code: 'TX', flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg' },
        { name: 'Utah', code: 'UT', flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Flag_of_Utah.svg' },
        { name: 'Vermont', code: 'VT', flag: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Vermont.svg' },
        { name: 'Virginia', code: 'VA', flag: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Flag_of_Virginia.svg' },
        { name: 'Washington', code: 'WA', flag: 'https://upload.wikimedia.org/wikipedia/commons/5/54/Flag_of_Washington.svg' },
        { name: 'West Virginia', code: 'WV', flag: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Flag_of_West_Virginia.svg' },
        { name: 'Wisconsin', code: 'WI', flag: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Flag_of_Wisconsin.svg' },
        { name: 'Wyoming', code: 'WY', flag: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Wyoming.svg' }
      ]
    },
    {
      name: 'Commonwealth/Territory',
      state: [
        { name: 'American Samoa', code: 'AS', flag: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Flag_of_American_Samoa.svg' },
        { name: 'District of Columbia', code: 'DC', flag: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Flag_of_the_District_of_Columbia.svg' },
        { name: 'Guam', code: 'GU', flag: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Flag_of_Guam.svg' },
        { name: 'Northern Mariana Islands', code: 'MP', flag: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Flag_of_the_Northern_Mariana_Islands.svg' },
        { name: 'Puerto Rico', code: 'PR', flag: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Flag_of_Puerto_Rico.svg' },
        { name: 'United States Virgin Islands', code: 'VI', flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/Flag_of_the_United_States_Virgin_Islands.svg' }
      ]
    }
  ];

  constructor(private _formBuilder: FormBuilder,
    private searchService: SearchService) { }

  ngOnInit() {
    this.stateFormGroup = this._formBuilder.group({
      stateCtrl: ['', Validators.required]
    });

    this.designationFormGroup = this._formBuilder.group({
      nationalParkCtrl: ['', Validators.required],
      nationalMonumentCtrl: ['', Validators.required],
      nationalHistoricSiteCtrl: ['', Validators.required],
      heritageAreaCtrl: ['', Validators.required]
    });

    this.generalParkInfoFormGroup = this._formBuilder.group({
      parkWeatherCtrl: ['', Validators.required],
      parkInfoCtrl: ['', Validators.required],
      parkDirectionsCtrl: ['', Validators.required]
    });
  }

  onSubmitStepper() {
    this.stepperSubmitted = true;
    console.log(this.stateFormGroup.value.stateCtrl);
    this.getParkData();
  }

  getParkData() {
    if (this.stateFormGroup.value.stateCtrl.code) {
      this.query = this.stateFormGroup.value.stateCtrl.code;
    }

    if (this.query !== undefined) {
      return this.searchService.getParkStepperResults(this.query).subscribe(
        data => this.handleParkSuccess(data),
        error => this.handleError(error)
      );
    }
    else {
      return this.searchService.getParkResults().subscribe(
        data => this.handleParkSuccess(data),
        error => this.handleError(error)
      );
    }
  }

  handleParkSuccess(data) {
    this.resultsFound = true;

    this.foundParks = data.data;
    console.log(this.foundParks);

    console.log(this.foundParks.length);
    console.log(this.imageObject);

    for (let i = 0; i < this.foundParks.length; i++) {
      this.foundPark = this.foundParks[i].images;
      console.log(this.foundPark);
      // this.imageObject = this.foundPark;
      console.log(this.foundPark.url);
      // this.imageObject = [{
      //   image: this.foundPark.url
      // }];
    }
  }

  handleError(error) {
    console.log(error);
  }
}
