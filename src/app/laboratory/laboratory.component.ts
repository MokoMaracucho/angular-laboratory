import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormGroup, FormBuilder } from  '@angular/forms';

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
        ]),
        trigger('isVisible_stereoscopy', [
            state('false', style({opacity: '0'})),
            state('true', style({opacity: '1'})),
            transition('false => true', [animate('2s')]),
            transition('true => false', [animate('1s')])
        ]),
        trigger('isVisible_art', [
            state('false', style({opacity: '0'})),
            state('true', style({opacity: '1'})),
            transition('false => true', [animate('2s')]),
            transition('true => false', [animate('1s')])
        ]),
        trigger('isVisible_contactMe', [
            state('false', style({opacity: '0'})),
            state('true', style({opacity: '1'})),
            transition('false => true', [animate('2s')]),
            transition('true => false', [animate('1s')])
        ]),
        trigger('isVisible_development', [
            state('false', style({opacity: '0'})),
            state('true', style({opacity: '1'})),
            transition('false => true', [animate('2s')]),
            transition('true => false', [animate('1s')])
        ]),
        trigger('isVisible_travel', [
            state('false', style({opacity: '0'})),
            state('true', style({opacity: '1'})),
            transition('false => true', [animate('2s')]),
            transition('true => false', [animate('1s')])
        ]),
        trigger('isVisible_movies', [
            state('false', style({opacity: '0'})),
            state('true', style({opacity: '1'})),
            transition('false => true', [animate('2s')]),
            transition('true => false', [animate('1s')])
        ])
    ]
})
export class LaboratoryComponent implements OnInit, OnDestroy {

    public innerWidth: any;
    public innerHeight: any;

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
    public isVisible_stereoscopy = false;
    public isVisible_art = false;
    public isVisible_contactMe = false;
    public isVisible_development = false;
    public isVisible_travel = false;
    public isVisible_movies = false;

    public contactForm: FormGroup;

    public anaglyph_activated = false;

    public isVisible_cache = false;

    public isVisible_dashBoard = false;
    public camera_datas: CameraDatas;

    @ViewChild('rendererCanvas_laboratory', { static: true })
    public rendererCanvas_laboratory: ElementRef<HTMLCanvasElement>;

    public constructor(
        private formBuilder: FormBuilder,
        private laboratoryService: LaboratoryService,
        readonly interaction: InteractionService
    ) {}

    ngOnInit(): void {
        this.innerWidth = window.innerWidth;
        this.innerHeight = window.innerHeight;
        this.laboratoryService.set_windowDimensions(this.innerWidth, this.innerHeight);

        this.createContactForm();

        this.laboratoryService.createScene(this.rendererCanvas_laboratory);
        this.laboratoryService.animate();

        this.subscription = this.interaction.isLoaded.subscribe(() => this.isLoaded_function());

        setTimeout(() => {this.webDeveloper_fadeIn = true}, 500);
        setTimeout(() => {this.introduction_fadeIn = true}, 1000);
        setTimeout(() => {this.btnCloseIntroduction_fadeIn = true}, 1500);

        this.subscription = this.interaction.change_language_english.subscribe(() => this.change_language_english());
        this.subscription = this.interaction.change_language_french.subscribe(() => this.change_language_french());
        this.subscription = this.interaction.change_language_spanish.subscribe(() => this.change_language_spanish());

        this.subscription = this.interaction.open_running.subscribe(() => this.open_running());
        this.subscription = this.interaction.open_shareKnowledge.subscribe(() => this.open_shareKnowledge());
        this.subscription = this.interaction.open_photography.subscribe(() => this.open_photography());
        this.subscription = this.interaction.open_games.subscribe(() => this.open_games());
        this.subscription = this.interaction.open_stereoscopy.subscribe(() => this.open_stereoscopy());
        this.subscription = this.interaction.toogle_anaglyph_activated.subscribe(() => this.toogle_anaglyph_activated());
        this.subscription = this.interaction.open_art.subscribe(() => this.open_art());
        this.subscription = this.interaction.open_contactMe.subscribe(() => this.open_contactMe());
        this.subscription = this.interaction.open_development.subscribe(() => this.open_development());
        this.subscription = this.interaction.open_travel.subscribe(() => this.open_travel());
        this.subscription = this.interaction.open_movies.subscribe(() => this.open_movies());

        this.subscription = this.interaction.toogle_cache.subscribe(() => this.toogle_cache());

        this.subscription = this.interaction.getCameraDatas_init.subscribe((cameraDatas: CameraDatas) => cameraDatas);
        this.camera_datas = this.laboratoryService.emitCameraDatas_init();
        this.subscription = this.interaction.getCameraDatas_loop.subscribe(() => this.getCameraDatas_loop());
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.innerWidth = window.innerWidth;
        this.innerHeight = window.innerHeight;
        this.laboratoryService.set_windowDimensions(window.innerWidth, window.innerHeight);
    }

    private isLoaded_function(): void {
        this.isLoaded = true;
        this.isLoaded_fadeOut = true;
    }

    public close_introduction(): void {
        this.isVisible_introductionBackground = false;
        this.isVisible_introduction = false;
        this.toogle_cache();
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
        console.log("Running");
        setTimeout(() => {
            this.isVisible_running = true;
        }, 1000);
    }

    public close_running(): void {
        this.laboratoryService.animation_closeCard();
        this.isVisible_running = false;
        this.toogle_cache();
    }

    private open_shareKnowledge(): void {
        setTimeout(() => {
            this.isVisible_shareKnowledge = true;
        }, 1000);
    }

    public close_shareKnowledge(): void {
        this.laboratoryService.animation_closeCard();
        this.isVisible_shareKnowledge = false;
        this.toogle_cache();
    }

    private open_photography(): void {
        setTimeout(() => {
            this.isVisible_photography = true;
        }, 1000);
    }

    public close_photography(): void {
        this.laboratoryService.animation_closeCard();
        this.isVisible_photography = false;
        this.toogle_cache();
    }

    private open_games(): void {
        setTimeout(() => {
            this.isVisible_games = true;
        }, 1000);
    }

    public close_games(): void {
        this.laboratoryService.animation_closeCard();
        this.isVisible_games = false;
        this.toogle_cache();
    }

    private open_stereoscopy(): void {
        setTimeout(() => {
            this.isVisible_stereoscopy = true;
        }, 1000);
    }

    public close_stereoscopy(): void {
        this.laboratoryService.animation_closeCard();
        this.isVisible_stereoscopy = false;
        this.toogle_cache();
    }

    public animation_switch_camera(): void {
        this.laboratoryService.animation_switch_camera();
    }

    private toogle_anaglyph_activated() {
        this.anaglyph_activated = !this.anaglyph_activated;
    }

    private open_art(): void {
        setTimeout(() => {
            this.isVisible_art = true;
        }, 1000);
    }

    public close_art(): void {
        this.laboratoryService.animation_closeCard();
        this.isVisible_art = false;
        this.toogle_cache();
    }

    private open_contactMe(): void {
        setTimeout(() => {
            this.isVisible_contactMe = true;
        }, 1000);
    }

    public close_contactMe(): void {
        this.laboratoryService.animation_closeCard();
        this.isVisible_contactMe = false;
        this.toogle_cache();
    }

    private createContactForm(){
      this.contactForm = this.formBuilder.group({
        fullName: [''],
        email: [''],
        message: ['']
      });
    }

    public onSubmit() {
      console.log('Your form data : ', this.contactForm.value );
    }

    private open_development(): void {
        setTimeout(() => {
            this.isVisible_development = true;
        }, 1000);
    }

    public close_development(): void {
        this.laboratoryService.animation_closeCard();
        this.isVisible_development = false;
        this.toogle_cache();
    }

    private open_travel(): void {
        setTimeout(() => {
            this.isVisible_travel = true;
        }, 1000);
    }

    public close_travel(): void {
        this.laboratoryService.animation_closeCard();
        this.isVisible_travel = false;
        this.toogle_cache();
    }

    private open_movies(): void {
        setTimeout(() => {
            this.isVisible_movies = true;
        }, 1000);
    }

    public close_movies(): void {
        this.laboratoryService.animation_closeMovies();
        this.isVisible_movies = false;
        this.toogle_cache();
    }

    private getCameraDatas_loop(): void {
        this.camera_datas = this.laboratoryService.emitCameraDatas_init();
    }

    private toogle_cache(): void {
        this.isVisible_cache = !this.isVisible_cache;
    }
}
