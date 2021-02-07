import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

import 'pepjs';

import { FormGroup, FormControl } from '@angular/forms';

import { AppComponent } from '../app.component';
import { LaboratoryService } from './services/laboratory.service';
import { InteractionService } from './services/interaction.service';

import { ConnectionService } from '../shared/services/connection.service';

@Component({
  selector: 'app-laboratory',
  templateUrl: './laboratory.component.html',
  styleUrls: ['./laboratory.component.css'],
  animations: [
    trigger('fadeOut_background', [
      state('false', style({background: '#160130'})),
      state('true', style({background: '#16013066'})),
      transition('false => true', [animate('2s')])
    ]),
    trigger('logoIntroduction_fadeIn', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')])
    ]),
    trigger('h1Introduction_fadeIn', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')])
    ]),
    trigger('textIntroduction_fadeIn', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')])
    ]),
    trigger('spanLanguageIntroduction_fadeIn', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')])
    ]),
    trigger('btnCloseIntroduction_fadeIn', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')])
    ]),
    trigger('isVisible_menu', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')])
    ]),
    trigger('isVisible_initPosition', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')])
    ]),
    trigger('isVisible_stereoscopy', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')]),
      transition('true => false', [animate('1s')])
    ]),
    trigger('isVisible_datas', [
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
    trigger('isVisible_stereoscopy', [
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
    trigger('isVisible_movies', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')]),
      transition('true => false', [animate('1s')])
    ]),
    trigger('isVisible_cacheMobileDevice', [
      state('false', style({background: '#00000000'})),
      state('true', style({background: '#00000066'})),
      transition('false => true', [animate('0.5s')])
    ]),
    trigger('isVisible_moviesButton', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')]),
      transition('true => false', [animate('1s')])
    ])
  ]
})
export class LaboratoryComponent implements OnInit, OnDestroy {

  // DEVICE

  private deviceInfo = null;
  public isMobileDevice;
  public isTabletDevice;
  public isDesktopDevice;

  // WINDOW

  public innerWidth: any;
  public innerHeight: any;

  public isMax576 = false;
  public isMin576 = false;
  public isMin768 = false;
  public isMin960 = false;
  public isMin1140 = false;

  // CV

  public isCV: boolean;

  // LANGUAGE

  public language_french = false;
  public language_english = true;
  public language_spanish = false;

  // INTERACTION

  private subscription: Subscription;
  private readonly destroy = new Subject<boolean>();

  // IS LOADED

  public isLoaded = false;
  public fadeOut_background = false;

  public isVisible_introductionBackground = true;
  public isVisible_introduction = true;

  public logoIntroduction_fadeIn = false;
  public h1Introduction_fadeIn = false;
  public textIntroduction_fadeIn = false;
  public spanLanguageIntroduction_fadeIn = false;
  public btnCloseIntroduction_fadeIn = false;

  public isVisible_menu = false;
  public isVisible_initPosition = false;

  public card_open = false;

  public isVisible_development = false;
  public isVisible_datas = false;
  public isVisible_stereoscopy = false;
  public isVisible_photography = false;
  public isVisible_contactMe = false;
  public isVisible_movies = false;

  public anaglyph_activated = false;
  public isVisible_moviesButton = false;

  public isVisible_cacheMobileDevice = false;

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

  @ViewChild('rendererCanvas_laboratory', { static: true })
  public rendererCanvas_laboratory: ElementRef<HTMLCanvasElement>;

  public constructor(
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
      this.defineWidthRange();

      this.isCV = this.activatedRoute.snapshot.params.isCV;
      if(!this.isCV) {
        this.isCV = false;
      }
      this.appComponent.set_isCV(this.isCV);
      this.laboratoryService.set_isCV(this.isCV);

      this.laboratoryService.createScene(this.rendererCanvas_laboratory);
      this.laboratoryService.animate();

      this.subscription = this.interaction.isLoaded.subscribe(() => this.isLoaded_function());

      setTimeout(() => {this.logoIntroduction_fadeIn = true}, 1000);
      setTimeout(() => {this.h1Introduction_fadeIn = true}, 1000);
      setTimeout(() => {this.textIntroduction_fadeIn = true}, 2000);
      setTimeout(() => {this.spanLanguageIntroduction_fadeIn = true}, 2000);

      this.subscription = this.interaction.change_language_english.subscribe(() => this.change_language_english());
      this.subscription = this.interaction.change_language_french.subscribe(() => this.change_language_french());
      this.subscription = this.interaction.change_language_spanish.subscribe(() => this.change_language_spanish());

      this.subscription = this.interaction.open_development.subscribe(() => this.open_development());
      this.subscription = this.interaction.open_datas.subscribe(() => this.open_datas());
      this.subscription = this.interaction.open_stereoscopy.subscribe(() => this.open_stereoscopy());
      this.subscription = this.interaction.toogle_anaglyph_activated.subscribe(() => this.toogle_anaglyph_activated());
      this.subscription = this.interaction.open_photography.subscribe(() => this.open_photography());
      this.subscription = this.interaction.open_contactMe.subscribe(() => this.open_contactMe());
      this.subscription = this.interaction.open_movies.subscribe(() => this.open_movies());
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
      this.defineWidthRange();
  }

  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange(event) {
    alert('orientationChanged');
  }

  private epicFunction() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.isMobileDevice = this.deviceService.isMobile();
    this.isTabletDevice = this.deviceService.isTablet();
    this.isDesktopDevice = this.deviceService.isDesktop();
  }

  private defineWidthRange(): void {
    if(this.innerWidth < 576) {
      this.isMax576 = true;
      this.isMin576 = false;
      this.isMin768 = false;
      this.isMin960 = false;
      this.isMin1140 = false;
      console.log("isMax576");
    } else if(this.innerWidth < 768) {
      this.isMax576 = false;
      this.isMin576 = true;
      this.isMin768 = false;
      this.isMin960 = false;
      this.isMin1140 = false;
      console.log("isMin576");
    } else if(this.innerWidth < 960) {
      this.isMax576 = false;
      this.isMin576 = false;
      this.isMin768 = true;
      this.isMin960 = false;
      this.isMin1140 = false;
      console.log("isMin768");
    } else if(this.innerWidth < 1140) {
      this.isMax576 = false;
      this.isMin576 = false;
      this.isMin768 = false;
      this.isMin960 = true;
      this.isMin1140 = false;
      console.log("isMin960");
    } else {
      this.isMax576 = false;
      this.isMin576 = false;
      this.isMin768 = false;
      this.isMin960 = false;
      this.isMin1140 = true;
      console.log("isMin1140");
    }
  }

  private isLoaded_function(): void {
      this.isLoaded = true;
      this.btnCloseIntroduction_fadeIn = true;
      this.fadeOut_background = true;
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

  public close_introduction(): void {
      this.isVisible_introductionBackground = false;
      this.isVisible_introduction = false;
      this.laboratoryService.animation_enterLaboratory();
      this.isVisible_menu = true;
      this.isVisible_initPosition = true;
      this.appComponent.close_navBar_menu();
  }

  public open_development(): void {
    if(this.card_open) {
      this.close_openedCard();
    }
    if(this.isMobileDevice) {
      this.isVisible_cacheMobileDevice = true;
    }
    this.isVisible_development = true;
    this.laboratoryService.open_card();
    this.card_open = true;
  }

  public close_development(): void {
    if(this.isMobileDevice && this.card_open) {
      this.isVisible_cacheMobileDevice = false;;
    }
    this.laboratoryService.activation_buttons();
    this.isVisible_development = false;
    this.laboratoryService.close_card();
    this.card_open = false;
  }

  public open_datas(): void {
    if(this.card_open) {
      this.close_openedCard();
    }
    if(this.isMobileDevice) {
      this.isVisible_cacheMobileDevice = true;
    }
    this.isVisible_datas = true;
    this.laboratoryService.open_card();
    this.card_open = true;
  }

  public close_datas(): void {
    if(this.isMobileDevice && this.card_open) {
      this.isVisible_cacheMobileDevice = false;;
    }
    this.laboratoryService.activation_buttons();
    this.isVisible_datas = false;
    this.card_open = false;
  }

  public open_stereoscopy(): void {
    if(this.card_open) {
      this.close_openedCard();
    }
    if(this.isMobileDevice) {
      this.isVisible_cacheMobileDevice = true;
    }
    this.isVisible_stereoscopy = true;
    this.laboratoryService.open_card();
    this.card_open = true;
  }

  public close_stereoscopy(): void {
    if(this.isMobileDevice && this.card_open) {
      this.isVisible_cacheMobileDevice = false;;
    }
    this.laboratoryService.activation_buttons();
    this.isVisible_stereoscopy = false;
    this.card_open = false;
  }

  private toogle_anaglyph_activated() {
      this.anaglyph_activated = !this.anaglyph_activated;
  }

  public animation_switch_camera(): void {
      this.laboratoryService.animation_switch_camera();
  }

  public open_photography(): void {
    if(this.card_open) {
      this.close_openedCard();
    }
    if(this.isMobileDevice) {
      this.isVisible_cacheMobileDevice = true;
    }
    this.isVisible_photography = true;
    this.laboratoryService.open_card();
    this.card_open = true;
  }

  public close_photography(): void {
    if(this.isMobileDevice && this.card_open) {
      this.isVisible_cacheMobileDevice = false;;
    }
    this.laboratoryService.activation_buttons();
    this.isVisible_photography = false;
    this.card_open = false;
  }

  public open_contactMe(): void {
    if(this.card_open) {
      this.close_openedCard();
    }
    if(this.isMobileDevice) {
      this.isVisible_cacheMobileDevice = true;
    }
    this.isVisible_contactMe = true;
    this.laboratoryService.open_card();
    this.card_open = true;
  }

  public close_contactMe(): void {
    if(this.isMobileDevice && this.card_open) {
      this.isVisible_cacheMobileDevice = false;;
    }
    this.laboratoryService.activation_buttons();
    this.isVisible_contactMe = false;
    this.card_open = false;
  }

  public open_movies(): void {
    if(this.card_open) {
      this.close_openedCard();
    }
    this.isVisible_movies = true;
    this.card_open = true;
    this.isVisible_moviesButton = true;
    this.laboratoryService.desactivation_moviesButtons();
  }

  public close_movies(): void {
    this.card_open = false;
    this.laboratoryService.animation_closeMovies();
    this.isVisible_movies = false;
    this.isVisible_moviesButton = false;
    this.laboratoryService.activation_moviesButtons();
  }

  private close_openedCard(): void {
    if(this.isVisible_development) {
      this.close_development();
    }
    else if(this.isVisible_datas) {
      this.close_datas();
    }
    else if(this.isVisible_stereoscopy) {
      this.close_stereoscopy();
    }
    else if(this.isVisible_photography) {
      this.close_photography();
    }
    else if(this.isVisible_contactMe) {
      this.close_contactMe();
    }
    else if(this.isVisible_movies) {
      this.close_movies();
    }
  }

  public init_position(): void {
    this.laboratoryService.init_position();
  }

  public cleanUp_laboratory() {
      this.laboratoryService.cleanUp();
  }
}
