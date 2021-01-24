import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { DevelopmentService } from './development/services/development.service';
import { LaboratoryService } from './laboratory/services/laboratory.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
      trigger('isCollapsed', [
          state('false', style({background: '#000000EE'})),
          state('true', style({background: '#00000033'})),
          transition('false => true', [animate('0.2s')]),
          transition('true => false', [animate('0.2s')])
      ])
  ]
})
export class AppComponent {

  public isCollapsed = true;

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

  public cleanUp_photography() {
      // this.photographyService.cleanUp();
  }

  public cleanUp_shareKnowledge() {
      // this.photographyService.cleanUp();
  }
}
