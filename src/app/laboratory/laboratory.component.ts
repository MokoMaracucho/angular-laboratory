import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { AppComponent } from '../app.component';
import { LaboratoryService } from './services/laboratory.service';
import { InteractionService } from './services/interaction.service';

import { ConnectionService } from '../shared/services/connection.service';

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

    public isMobileDevice;
    public isTabletDevice;
    public isDesktopDevice;
    private deviceInfo = null;

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

    public anaglyph_activated = false;

    public isCV: boolean;

    public contactForm = new FormGroup({
      contactFormName: new FormControl(''),
      contactFormEmail: new FormControl(''),
      contactFormSubjects: new FormControl(''),
      contactFormMessage: new FormControl('')
    });

    public disabledSubmitButton: boolean = true;

    @HostListener('input') oninput() {
      if (this.contactForm.valid) {
        this.disabledSubmitButton = false;
      }
    }

    // public isVisible_cache = false;

    public isVisible_dashBoard = false;
    public camera_datas: CameraDatas;

    @ViewChild('rendererCanvas_laboratory', { static: true })
    public rendererCanvas_laboratory: ElementRef<HTMLCanvasElement>;

    public constructor(
        private formBuilder: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private deviceService: DeviceDetectorService,
        private connectionService: ConnectionService,
        private appComponent: AppComponent,
        private laboratoryService: LaboratoryService,
        readonly interaction: InteractionService
    ) {}

    ngOnInit(): void {
        this.epicFunction();
        this.innerWidth = window.innerWidth;
        this.innerHeight = window.innerHeight;
        this.laboratoryService.set_windowDimensions(this.innerWidth, this.innerHeight);

        this.isCV = this.activatedRoute.snapshot.params.isCV;
        if(!this.isCV) {
          this.isCV = false;
        }
        this.laboratoryService.set_isCV(this.isCV);

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

        // this.subscription = this.interaction.toogle_cache.subscribe(() => this.toogle_cache());

        this.subscription = this.interaction.getCameraDatas_init.subscribe((cameraDatas: CameraDatas) => cameraDatas);
        this.camera_datas = this.laboratoryService.emitCameraDatas_init();
        this.subscription = this.interaction.getCameraDatas_loop.subscribe(() => this.getCameraDatas_loop());
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    onSubmit() {
      this.connectionService.sendMessage(this.contactForm.value).subscribe(() => {
        alert('Your message has been sent.');
        this.contactForm.reset();
        this.disabledSubmitButton = true;
      }, error => {
        console.log('Error', error);
      });
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
        // this.toogle_cache();
        this.laboratoryService.animation_enterLaboratory();
    }

    private change_language_english(): void {
        this.language_english = true;
        this.language_french = false;
        this.language_spanish = false;
        this.appComponent.change_language_english();
    }

    private change_language_french(): void {
        this.language_english = false;
        this.language_french = true;
        this.language_spanish = false;
        this.appComponent.change_language_french();
    }

    private change_language_spanish(): void {
        this.language_english = false;
        this.language_french = false;
        this.language_spanish = true;
        this.appComponent.change_language_spanish();
    }

    private open_running(): void {
        this.isVisible_running = true;
    }

    public close_running(): void {
        this.laboratoryService.animation_closeCard();
        this.isVisible_running = false;
        // this.toogle_cache();
    }

    private open_shareKnowledge(): void {
        this.isVisible_shareKnowledge = true;
    }

    public close_shareKnowledge(): void {
        this.laboratoryService.animation_closeCard();
        this.isVisible_shareKnowledge = false;
        // this.toogle_cache();
    }

    private open_photography(): void {
        this.isVisible_photography = true;
    }

    public close_photography(): void {
        this.laboratoryService.animation_closeCard();
        this.isVisible_photography = false;
        // this.toogle_cache();
    }

    private open_games(): void {
        this.isVisible_games = true;
    }

    public close_games(): void {
        this.laboratoryService.animation_closeCard();
        this.isVisible_games = false;
        // this.toogle_cache();
    }

    private open_stereoscopy(): void {
        this.isVisible_stereoscopy = true;
    }

    public close_stereoscopy(): void {
        this.laboratoryService.animation_closeCard();
        this.isVisible_stereoscopy = false;
        // this.toogle_cache();
    }

    public animation_switch_camera(): void {
        this.laboratoryService.animation_switch_camera();
    }

    private toogle_anaglyph_activated() {
        this.anaglyph_activated = !this.anaglyph_activated;
    }

    private open_art(): void {
        this.isVisible_art = true;
    }

    public close_art(): void {
        this.laboratoryService.animation_closeCard();
        this.isVisible_art = false;
        // this.toogle_cache();
    }

    private open_contactMe(): void {
        this.isVisible_contactMe = true;
    }

    public close_contactMe(): void {
        this.laboratoryService.animation_closeCard();
        this.isVisible_contactMe = false;
        // this.toogle_cache();
    }

    private open_development(): void {
        this.isVisible_development = true;
    }

    public close_development(): void {
        this.laboratoryService.animation_closeCard();
        this.isVisible_development = false;
        // this.toogle_cache();
    }

    private open_travel(): void {
        this.isVisible_travel = true;
    }

    public close_travel(): void {
        this.laboratoryService.animation_closeCard();
        this.isVisible_travel = false;
        // this.toogle_cache();
    }

    private open_movies(): void {
        this.isVisible_movies = true;
    }

    public close_movies(): void {
        this.laboratoryService.animation_closeMovies();
        this.isVisible_movies = false;
        // this.toogle_cache();
    }

    // private toogle_cache(): void {
        // this.isVisible_cache = !this.isVisible_cache;
    // }

    private getCameraDatas_loop(): void {
        this.camera_datas = this.laboratoryService.emitCameraDatas_init();
    }

    private epicFunction() {
      console.log('hello `Home` component');
      this.deviceInfo = this.deviceService.getDeviceInfo();
      this.isMobileDevice = this.deviceService.isMobile();
      this.isTabletDevice = this.deviceService.isTablet();
      this.isDesktopDevice = this.deviceService.isDesktop();
      console.log(this.deviceInfo);
      console.log(this.isMobileDevice);
      console.log(this.isTabletDevice);
      console.log(this.isDesktopDevice);
    }

    public init_position(): void {
      this.laboratoryService.init_position();
    }
}
