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
        ]),
        trigger('isVisible_running', [
            state('false', style({opacity: '0'})),
            state('true', style({opacity: '1'})),
            transition('false => true', [animate('2s')]),
            transition('true => false', [animate('1s')])
        ]),
        trigger('isVisible_shareKnowledge', [
            state('false', style({opacity: '0'})),
            state('true', style({opacity: '1'})),
            transition('false => true', [animate('2s')]),
            transition('true => false', [animate('1s')])
        ]),
        trigger('isVisible_photography', [
            state('false', style({opacity: '0'})),
            state('true', style({opacity: '1'})),
            transition('false => true', [animate('2s')]),
            transition('true => false', [animate('1s')])
        ]),
        trigger('isVisible_games', [
            state('false', style({opacity: '0'})),
            state('true', style({opacity: '1'})),
            transition('false => true', [animate('2s')]),
            transition('true => false', [animate('1s')])
        ])
    ]
})
export class LaboratoryComponent implements OnInit, OnDestroy {

    public language_french = false;
    public language_english = true;
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

    public isVisible_running = false;
    public isVisible_shareKnowledge = false;
    public isVisible_photography = false;
    public isVisible_games = false;

    public isVisible_dashBoard = false;
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

        this.subscription = this.interaction.change_language_english.subscribe(() => this.change_language_english());
        this.subscription = this.interaction.change_language_french.subscribe(() => this.change_language_french());
        this.subscription = this.interaction.change_language_spanish.subscribe(() => this.change_language_spanish());

        this.subscription = this.interaction.open_running.subscribe(() => this.open_running());
        this.subscription = this.interaction.open_shareKnowledge.subscribe(() => this.open_shareKnowledge());
        this.subscription = this.interaction.open_photography.subscribe(() => this.open_photography());
        this.subscription = this.interaction.open_games.subscribe(() => this.open_games());

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

    private change_language_english(): void {
        this.language_english = true;
        this.language_french = false;
        this.language_spanish = false;
    }

    private change_language_french(): void {
        this.language_english = false;
        this.language_french = true;
        this.language_spanish = false;
    }

    private change_language_spanish(): void {
        this.language_english = false;
        this.language_french = false;
        this.language_spanish = true;
    }

    private open_running(): void {
        setTimeout(() => {
            this.isVisible_running = true;
        }, 1000);
    }

    public close_running(): void {
        this.laboratoryService.animation_close();
        this.isVisible_running = false;
    }

    private open_shareKnowledge(): void {
        setTimeout(() => {
            this.isVisible_shareKnowledge = true;
        }, 1000);
    }

    public close_shareKnowledge(): void {
        this.laboratoryService.animation_close();
        this.isVisible_shareKnowledge = false;
    }

    private open_photography(): void {
        setTimeout(() => {
            this.isVisible_photography = true;
        }, 1000);
    }

    public close_photography(): void {
        this.laboratoryService.animation_close();
        this.isVisible_photography = false;
    }

    private open_games(): void {
        setTimeout(() => {
            this.isVisible_games = true;
        }, 1000);
    }

    public close_games(): void {
        this.laboratoryService.animation_close();
        this.isVisible_games = false;
    }

    private getCameraDatas_loop(): void {
        this.camera_datas = this.laboratoryService.emitCameraDatas_init();
    }
}
