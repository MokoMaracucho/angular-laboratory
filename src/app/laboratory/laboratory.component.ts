import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Subscription, Subject } from 'rxjs';

import { LaboratoryService } from './services/laboratory.service';
import { InteractionService } from './services/interaction.service';

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
        trigger('btnCloseHome_fadeIn', [
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
    public btnCloseHome_fadeIn = false;

    @ViewChild('rendererCanvas_laboratory', { static: true })
    public rendererCanvas_laboratory: ElementRef<HTMLCanvasElement>;

    public constructor(
        private laboratoryService: LaboratoryService,
        readonly interaction: InteractionService
    ) {}

    ngOnInit(): void {
        this.laboratoryService.createScene(this.rendererCanvas_laboratory);
        this.laboratoryService.animate();

        setTimeout(() => {
            this.webDeveloper_fadeIn = true;
        }, 500);

        setTimeout(() => {
            this.introduction_fadeIn = true;
        }, 1000);

        setTimeout(() => {
            this.btnCloseHome_fadeIn = true;
        }, 1500);

        this.subscription = this.interaction.isLoaded.subscribe(() => this.isLoaded_function());
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    private isLoaded_function(): void {
        this.isLoaded = true;
        this.isLoaded_fadeOut = true;
    }
}
