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

  foundYosemiteCampgrounds: any[];

  ngOnInit() {

    // this.stepperForm = new FormGroup({
    //   'firstCtrl': new FormControl(null, [Validators.required])
    // });


    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
  }


  onSubmitStepper() {
    // console.log(this.firstFormGroup);
    // console.log(this.secondFormGroup);
    // console.log(this.thirdFormGroup);
    if (this.firstFormGroup.value.firstCtrl == true) {
      return this.searchService.getYosemiteCampgroundResults().subscribe(
        data => this.handleSuccess(data),
        error => this.handleError(error)
      );
    }
  }

  handleSuccess(data) {
    this.foundYosemiteCampgrounds = data;
    console.log(this.foundYosemiteCampgrounds);
  }

  handleError(error) {
    console.log(error);
  }



}
