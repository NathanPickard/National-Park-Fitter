import { Component, ViewChild, OnInit } from '@angular/core';

import { SideNavService } from './side-nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'national-park-fitter';

  @ViewChild('sidenav', { static: true }) sidenav;

  constructor(private sideNavService: SideNavService) { }

  private sideNavSub;

  ngOnInit() {
    this.sideNavSub = this.sideNavService.openNav$.subscribe(() => this.sidenav.open());
  }

  closeSidenav() {
    this.sidenav.close();
  }

}

