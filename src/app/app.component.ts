import { Component } from '@angular/core';

import { DevelopmentService } from './development/services/development.service';
import { LaboratoryService } from './laboratory/services/laboratory.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private developmentService: DevelopmentService,
    private laboratoryService: LaboratoryService
  ) {}

  public cleanUp_development() {
      this.developmentService.cleanUp();
  }

  public cleanUp_laboratory() {
      this.laboratoryService.cleanUp();
  }
}
