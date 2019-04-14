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
  generalParkInfoFormGroup: FormGroup;

  foundParks: any[];

  stepperSubmitted: boolean = false;
  resultsFound: boolean = false;

  constructor(private _formBuilder: FormBuilder,
    private searchService: SearchService) { }

  ngOnInit() {
    this.stateFormGroup = this._formBuilder.group({
      stateCtrl: ['', Validators.required]
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
