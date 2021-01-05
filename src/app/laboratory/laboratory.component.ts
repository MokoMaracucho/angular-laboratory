import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { LaboratoryService } from './services/laboratory.service';

@Component({
  selector: 'app-laboratory',
  templateUrl: './laboratory.component.html',
  styleUrls: ['./laboratory.component.css']
})
export class LaboratoryComponent implements OnInit {

    @ViewChild('rendererCanvas_laboratory', { static: true })
    public rendererCanvas_laboratory: ElementRef<HTMLCanvasElement>;


    public constructor(
      private laboratoryService: LaboratoryService
    ) {}

    ngOnInit(): void {
        this.laboratoryService.createScene(this.rendererCanvas_laboratory);
        this.laboratoryService.animate();
    }
}
