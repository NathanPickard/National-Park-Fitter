import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { SearchService } from './../search.service';

export interface State {
  name: string;
  code: string;
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
        { name: 'Alabama', code: 'AL' },
        { name: 'Alaska', code: 'AK' },
        { name: 'Arizona', code: 'AZ' },
        { name: 'Arkansas', code: 'AR' },
        { name: 'California', code: 'CA' },
        { name: 'Colorado', code: 'CO' },
        { name: 'Connecticut', code: 'CT' },
        { name: 'Delaware', code: 'DE' },
        { name: 'Florida', code: 'FL' },
        { name: 'Georgia', code: 'GA' },
        { name: 'Hawaii', code: 'HI' },
        { name: 'Idaho', code: 'ID' },
        { name: 'Illinois', code: 'IL' },
        { name: 'Indiana', code: 'IN' },
        { name: 'Iowa', code: 'IA' },
        { name: 'Kansas', code: 'KS' },
        { name: 'Kentucky', code: 'KY' },
        { name: 'Louisiana', code: 'LA' },
        { name: 'Maine', code: 'ME' },
        { name: 'Maryland', code: 'MD' },
        { name: 'Massachusetts', code: 'MA' },
        { name: 'Michigan', code: 'MI' },
        { name: 'Minnesota', code: 'MN' },
        { name: 'Mississippi', code: 'MS' },
        { name: 'Missouri', code: 'MO' },
        { name: 'Montana', code: 'MT' },
        { name: 'Nebraska', code: 'NE' },
        { name: 'Nevada', code: 'NV' },
        { name: 'New Hampshire', code: 'NH' },
        { name: 'New Jersey', code: 'NJ' },
        { name: 'New Mexico', code: 'NM' },
        { name: 'New York', code: 'NY' },
        { name: 'North Carolina', code: 'NC' },
        { name: 'North Dakota', code: 'ND' },
        { name: 'Ohio', code: 'OH' },
        { name: 'Oklahoma', code: 'OK' },
        { name: 'Oregon', code: 'OR' },
        { name: 'Pennsylvania', code: 'PA' },
        { name: 'Rhode Island', code: 'RI' },
        { name: 'South Carolina', code: 'SC' },
        { name: 'South Dakota', code: 'SD' },
        { name: 'Tennessee', code: 'TN' },
        { name: 'Texas', code: 'TX' },
        { name: 'Utah', code: 'UT' },
        { name: 'Vermont', code: 'VT' },
        { name: 'Virginia', code: 'VA' },
        { name: 'Washington', code: 'WA' },
        { name: 'West Virginia', code: 'WV' },
        { name: 'Wisconsin', code: 'WI' },
        { name: 'Wyoming', code: 'WY' }
      ]
    },
    {
      name: 'Commonwealth/Territory',
      state: [
        { name: 'American Samoa', code: 'AS' },
        { name: 'District of Columbia', code: 'DC' },
        { name: 'Guam', code: 'GU' },
        { name: 'Northern Mariana Islands', code: 'MP' },
        { name: 'Puerto Rico', code: 'PR' },
        { name: 'Virgin Islands', code: 'VI' }
      ]
    }
    // states: State[] = [
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
