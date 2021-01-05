import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { DevelopmentService } from './services/development.service';

@Component({
  selector: 'app-development',
  templateUrl: './development.component.html',
  styleUrls: ['./development.component.css']
})
export class DevelopmentComponent implements OnInit {

  @ViewChild('rendererCanvas_development', { static: true })
  public rendererCanvas_development: ElementRef<HTMLCanvasElement>;

  public constructor(
    private developmentService: DevelopmentService
  ) {}

  ngOnInit(): void {
      this.developmentService.createScene(this.rendererCanvas_development);
      this.developmentService.animate();
  }
}
