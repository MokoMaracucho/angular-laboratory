import { Component, HostListener, OnInit } from '@angular/core';

import { DevelopmentService } from './development/services/development.service';
import { LaboratoryService } from './laboratory/services/laboratory.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public innerWidth: any;
  public innerHeight: any;

  public laboratory_isActive = true;
  public development_isActive = false;

  constructor(
      private developmentService: DevelopmentService,
      private laboratoryService: LaboratoryService
  ) {}

  ngOnInit(): void {
      this.innerWidth = window.innerWidth;
      this.innerHeight = window.innerHeight;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
      this.innerWidth = window.innerWidth;
      this.innerHeight = window.innerHeight;
  }

  public cleanUp_development() {
      this.developmentService.cleanUp();
      this.laboratory_isActive = true;
      this.development_isActive = false;
  }

  public cleanUp_laboratory() {
      this.laboratoryService.cleanUp();
      this.laboratory_isActive = false;
      this.development_isActive = true;
  }
}
