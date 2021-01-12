import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { DevelopmentService } from './services/development.service';
import { InteractionService } from './services/interaction.service';

import { CameraDatas } from '../shared/models/camera-datas';

@Component({
    selector: 'app-development',
    templateUrl: './development.component.html',
    styleUrls: ['./development.component.css'],
    animations: [
        trigger('isLoaded_fadeOut', [
            state('false', style({background: '#002486'})),
            state('true', style({background: '#00248666'})),
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
export class DevelopmentComponent implements OnInit, OnDestroy {

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

    public isVisible_dashBoard = true;
    public camera_datas: CameraDatas;

    @ViewChild('rendererCanvas_development', { static: true })
    public rendererCanvas_development: ElementRef<HTMLCanvasElement>;

    public constructor(
        private developmentService: DevelopmentService,
        readonly interaction: InteractionService
    ) {}

    ngOnInit(): void {
        this.developmentService.createScene(this.rendererCanvas_development);
        this.developmentService.animate();

        this.subscription = this.interaction.isLoaded.subscribe(() => this.isLoaded_function());

        setTimeout(() => {this.webDeveloper_fadeIn = true}, 500);
        setTimeout(() => {this.introduction_fadeIn = true}, 1000);
        setTimeout(() => {this.btnCloseIntroduction_fadeIn = true}, 1500);

        this.subscription = this.interaction.change_language_english.subscribe(() => this.change_language_english());
        this.subscription = this.interaction.change_language_french.subscribe(() => this.change_language_french());
        this.subscription = this.interaction.change_language_spanish.subscribe(() => this.change_language_spanish());

        this.subscription = this.interaction.getCameraDatas_init.subscribe((cameraDatas: CameraDatas) => cameraDatas);
        this.camera_datas = this.developmentService.emitCameraDatas_init();
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
        this.developmentService.animation_enterDevelopment();
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

    private getCameraDatas_loop(): void {
        this.camera_datas = this.developmentService.emitCameraDatas_init();
    }
}
