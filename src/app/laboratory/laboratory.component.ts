import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Subscription, Subject } from 'rxjs';

import { LaboratoryService } from './services/laboratory.service';
import { InteractionService } from './services/interaction.service';

import { CameraDatas } from '../shared/models/camera-datas';

@Component({
    selector: 'app-laboratory',
    templateUrl: './laboratory.component.html',
    styleUrls: ['./laboratory.component.css'],
    animations: [
        trigger('isLoaded_fadeOut', [
            state('false', style({background: '#160130'})),
            state('true', style({background: '#16013066'})),
            transition('false => true', [animate('2s')])
        ]),
        trigger('webDeveloper_fadeIn', [
            state('false', style({opacity: '0'})),
            state('true', style({opacity: '1'})),
            transition('false => true', [animate('2s')])
        ]),
        trigger('introduction_fadeIn', [
            state('false', style({opacity: '0'})),
            state('true', style({opacity: '1'})),
            transition('false => true', [animate('2s')])
        ]),
        trigger('btnCloseIntroduction_fadeIn', [
            state('false', style({opacity: '0'})),
            state('true', style({opacity: '1'})),
            transition('false => true', [animate('2s')])
        ])
    ]
})
export class LaboratoryComponent implements OnInit, OnDestroy {

    public language_french = true;
    public language_english = false;
    public language_spanish = false;

    private subscription: Subscription;
    private readonly destroy = new Subject<boolean>();

    public isLoaded = false;
    public isLoaded_fadeOut = false;
    public isVisible_introductionBackground = true;
    public isVisible_introduction = true;
    public webDeveloper_fadeIn = false;
    public introduction_fadeIn = false;
    public btnCloseIntroduction_fadeIn = false;

    public isVisible_dashBoard = true;
    public camera_datas: CameraDatas;

    @ViewChild('rendererCanvas_laboratory', { static: true })
    public rendererCanvas_laboratory: ElementRef<HTMLCanvasElement>;

    public constructor(
        private laboratoryService: LaboratoryService,
        readonly interaction: InteractionService
    ) {}

    ngOnInit(): void {
        this.laboratoryService.createScene(this.rendererCanvas_laboratory);
        this.laboratoryService.animate();

        setTimeout(() => {this.webDeveloper_fadeIn = true}, 500);
        setTimeout(() => {this.introduction_fadeIn = true}, 1000);
        setTimeout(() => {this.btnCloseIntroduction_fadeIn = true}, 1500);

        this.subscription = this.interaction.isLoaded.subscribe(() => this.isLoaded_function());

        this.subscription = this.interaction.getCameraDatas_init.subscribe((cameraDatas: CameraDatas) => cameraDatas);
        this.camera_datas = this.laboratoryService.emitCameraDatas_init();
        this.subscription = this.interaction.getCameraDatas_loop.subscribe(() => this.getCameraDatas_loop());
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    private isLoaded_function(): void {
        this.isLoaded = true;
        this.isLoaded_fadeOut = true;
    }

    public close_introduction(): void {
        this.isVisible_introductionBackground = false;
        this.isVisible_introduction = false;
        this.laboratoryService.animation_enterLaboratory();
    }

    private getCameraDatas_loop(): void {
        this.camera_datas = this.laboratoryService.emitCameraDatas_init();
    }
}
