import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SearchService } from '../../shared/search.service';

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
  selector: 'app-park-stepper',
  templateUrl: './park-stepper.component.html',
  styleUrls: ['./park-stepper.component.css']
})
export class ParkStepperComponent implements OnInit {

  foundParkImageArray: any;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
  }

}
