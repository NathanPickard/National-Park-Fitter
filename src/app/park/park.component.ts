import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { SearchService } from './../search.service';


@Component({
  selector: 'app-park',
  templateUrl: './park.component.html',
  styleUrls: ['./park.component.css']
})
export class ParkComponent implements OnInit {

  stateFormGroup: FormGroup;
  designationFormGroup: FormGroup;
  generalParkInfoFormGroup: FormGroup;

  foundParks: any[];

  stepperSubmitted: boolean = false;
  resultsFound: boolean = false;

  states: string[] = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
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
      parkInfoCtrl: ['', Validators.required]
    });
  }

  onSubmitStepper() {
    this.stepperSubmitted = true;
    this.getParkData();
  }

  getParkData() {
    return this.searchService.getParkResults().subscribe(
      data => this.handleParkSuccess(data),
      error => this.handleError(error)
    );
  }

  handleParkSuccess(data) {
    this.resultsFound = true;

    this.foundParks = data.data;
    console.log(this.foundParks);
  }

  handleError(error) {
    console.log(error);
  }


}
