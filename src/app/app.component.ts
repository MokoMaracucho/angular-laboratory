import { Component } from '@angular/core';

import { DevelopmentService } from './development/services/development.service';
import { LaboratoryService } from './laboratory/services/laboratory.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public laboratory_isActive = true;
  public development_isActive = false;
  public shareKnowledge_isActive = false;
  public photography_isActive = false;

  public photography_isCreated = false;

  constructor(
      private developmentService: DevelopmentService,
      private laboratoryService: LaboratoryService
  ) {}

  public cleanUp_development() {
      this.developmentService.cleanUp();
      this.laboratory_isActive = true;
      this.development_isActive = false;
      this.shareKnowledge_isActive = false;
      this.photography_isActive = false;
  }

  public cleanUp_laboratory() {
      this.laboratoryService.cleanUp();
      this.laboratory_isActive = false;
      this.development_isActive = true;
      this.shareKnowledge_isActive = false;
      this.photography_isActive = false;
  }

  public cleanUp_photography() {
      // this.photographyService.cleanUp();
      // this.laboratory_isActive = false;
      // this.development_isActive = false;
      // this.shareKnowledge_isActive = false;
      // this.photography_isActive = true;
  }

  public cleanUp_shareKnowledge() {
      // this.photographyService.cleanUp();
      // this.laboratory_isActive = false;
      // this.development_isActive = false;
      // this.shareKnowledge_isActive = false;
      // this.photography_isActive = true;
  }
}
