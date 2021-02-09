import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

import 'pepjs';

import { AppComponent } from '../app.component';
import { LaboratoryService } from './services/laboratory.service';
import { InteractionService } from './services/interaction.service';

import { ConnectionService } from '../shared/services/connection.service';

@Component({
  selector: 'app-laboratory',
  templateUrl: './laboratory.component.html',
  styleUrls: ['./laboratory.component.css'],
  animations: [
    trigger('fadeOut_backgroundIntroduction', [
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
    trigger('development_fadeIn', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')])
    ]),
    trigger('datas_fadeIn', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')])
    ]),
    trigger('stereoscopy_fadeIn', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('1s')])
    ]),
    trigger('switchCamera_fadeIn', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('1s')])
    ]),
    trigger('socNet_fadeIn', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('1s')])
    ]),
    trigger('photography_fadeIn', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')])
    ]),
    trigger('movies_fadeIn', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')])
    ]),
    trigger('contactMe_fadeIn', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')])
    ]),
    trigger('isVisible_cacheMobileDevice', [
      state('false', style({background: '#00000000'})),
      state('true', style({background: '#00000088'})),
      transition('false => true', [animate('2s')])
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
  public fadeOut_backgroundIntroduction = false;

  public isOpen_introductionBackground = true;
  public isOpen_introduction = true;

  public logoIntroduction_fadeIn = false;
  public h1Introduction_fadeIn = false;
  public textIntroduction_fadeIn = false;
  public spanLanguageIntroduction_fadeIn = false;
  public btnCloseIntroduction_fadeIn = false;

  public isVisible_menu = false;
  public isVisible_initPosition = false;

  public isCard_open = false;

  public isOpen_development = false;
  public development_fadeIn = false;

  public isOpen_datas = false;
  public datas_fadeIn = false;

  public isOpen_stereoscopy = false;
  public stereoscopy_fadeIn = false;
  public isOpen_switchCamera = false;
  public switchCamera_fadeIn = false;

  public isOpen_socNet = false;
  public socNet_fadeIn = false;

  public isActive_cameraRegular = true;
  public isActive_cameraAnaglyph = false;

  public isOpen_photography = false;
  public photography_fadeIn = false;

  public isOpen_movies = false;
  public movies_fadeIn = false;

  public isMuted = false;

  public isOpen_contactMe = false;
  public contactMe_fadeIn = false;

  public isVisible_cacheMobileDevice = false;

  @ViewChild('rendererCanvas_laboratory', { static: true })
  public rendererCanvas_laboratory: ElementRef<HTMLCanvasElement>;

  public container_introduction

  public constructor(
      private activatedRoute: ActivatedRoute,
      private deviceService: DeviceDetectorService,
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
      this.subscription = this.interaction.open_socialNetworks.subscribe(() => this.open_socialNetworks());
      this.subscription = this.interaction.open_photography.subscribe(() => this.open_photography());
      this.subscription = this.interaction.open_contactMe.subscribe(() => this.open_contactMe());
      this.subscription = this.interaction.open_movies.subscribe(() => this.open_movies());
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
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
    // alert('orientationChanged');
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
      this.fadeOut_backgroundIntroduction = true;
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
      this.isOpen_introductionBackground = false;
      this.isOpen_introduction = false;
      this.laboratoryService.animation_enterLaboratory();
      this.isVisible_menu = true;
      this.isVisible_initPosition = true;
      this.appComponent.close_navBar_menu();
  }

  // DEVELOPPEMENT

  public open_development(): void {
    this.laboratoryService.desactivation_buttonsDevelopment();
    if(this.isCard_open) {
      this.close_openedCard();
    }
    this.isOpen_development = true;
    this.development_fadeIn = true;
    if(!this.isCard_open) {
      this.laboratoryService.open_card();
      this.isCard_open = true;
    }
    if(this.isMobileDevice) {
      this.isVisible_cacheMobileDevice = true;
      if(this.isOpen_stereoscopy) {
        this.close_switchCamera();
      }
    }
    if(this.isOpen_movies) {
      this.close_movies(false);
    }
  }

  public close_development(close_clicked): void {
    this.laboratoryService.activation_buttonsDevelopment();
    this.isOpen_development = false;
    this.development_fadeIn = false;
    if(close_clicked) {
      this.laboratoryService.close_card();
      this.isCard_open = false;
      if(this.isMobileDevice) {
        this.isVisible_cacheMobileDevice = false;
      }
    }
  }

  // DATAS

  public open_datas(): void {
    this.laboratoryService.desactivation_buttonsDatas();
    if(this.isCard_open) {
      this.close_openedCard();
    }
    this.isOpen_datas = true;
    this.datas_fadeIn = true;
    if(!this.isCard_open) {
      this.laboratoryService.open_card();
      this.isCard_open = true;
    }
    if(this.isMobileDevice) {
      this.isVisible_cacheMobileDevice = true;
      if(this.isOpen_stereoscopy) {
        this.close_switchCamera();
      }
    }
    if(this.isOpen_movies) {
      this.close_movies(false);
    }
  }

  public close_datas(close_clicked): void {
    this.laboratoryService.activation_buttonsDatas();
    this.isOpen_datas = false;
    this.datas_fadeIn = false;
    if(close_clicked) {
      this.laboratoryService.close_card();
      this.isCard_open = false;
      if(this.isMobileDevice) {
        this.isVisible_cacheMobileDevice = false;
      }
    }
  }

  // STEREOSCOPY

  public open_stereoscopy(): void {
    this.laboratoryService.desactivation_buttonsStereoscopy();
    if(this.isCard_open) {
      this.close_openedCard();
    }
    this.isOpen_stereoscopy = true;
    this.stereoscopy_fadeIn = true;
    this.isOpen_switchCamera = true;
    this.switchCamera_fadeIn = true;
    if(!this.isCard_open && !this.isMobileDevice) {
      this.laboratoryService.open_card();
      this.isCard_open = true;
    }
    if(this.isMobileDevice && this.isCard_open) {
      this.isVisible_cacheMobileDevice = false;
      this.laboratoryService.init_position();
      this.isCard_open = false;
    }
  }

  public close_stereoscopy(close_clicked): void {
    this.laboratoryService.activation_buttonsStereoscopy();
    this.isOpen_stereoscopy = false;
    this.stereoscopy_fadeIn = false;
    if(close_clicked) {
      this.laboratoryService.close_card();
      this.isCard_open = false;
      if(this.isMobileDevice) {
        this.isVisible_cacheMobileDevice = false;
      }
    }
    if(this.isMobileDevice) {
      this.close_switchCamera();
    }
  }

  public close_switchCamera(): void {
    this.isOpen_switchCamera = false;
    if(this.isOpen_stereoscopy && !this.isMobileDevice) {
      this.close_stereoscopy(true);
    }
    if(this.isMobileDevice) {
      this.isOpen_stereoscopy = false;
      this.stereoscopy_fadeIn = false;
    }
  }

  public switch_cameraRegular(): void {
    if(!this.isActive_cameraRegular) {
      this.laboratoryService.switch_camera();
      this.isActive_cameraRegular = !this.isActive_cameraRegular;
      this.isActive_cameraAnaglyph = !this.isActive_cameraAnaglyph;
    }
  }

  public switch_cameraAnaglyph(): void {
    if(!this.isActive_cameraAnaglyph) {
      this.laboratoryService.switch_camera();
      this.isActive_cameraRegular = !this.isActive_cameraRegular;
      this.isActive_cameraAnaglyph = !this.isActive_cameraAnaglyph;
    }
  }

  // SOCIAL NETWORKS

  public open_socialNetworks(): void {
    this.laboratoryService.desactivation_buttonsSocialNetworks();
    if(this.isCard_open) {
      this.close_openedCard();
    }
    this.isOpen_socNet = true;
    this.socNet_fadeIn = true;
    if(!this.isCard_open) {
      this.laboratoryService.open_card();
      this.isCard_open = true;
    }
    if(this.isMobileDevice) {
      this.isVisible_cacheMobileDevice = true;
      if(this.isOpen_stereoscopy) {
        this.close_switchCamera();
      }
    }
    if(this.isOpen_movies) {
      this.close_movies(false);
    }
  }

  public close_socialNetworks(close_clicked): void {
    this.laboratoryService.activation_buttonsSocialNetworks();
    this.isOpen_socNet = false;
    this.socNet_fadeIn = false;
    if(close_clicked) {
      this.laboratoryService.close_card();
      this.isCard_open = false;
      // this.laboratoryService.set_isOpenCard(this.isCard_open);
      if(this.isMobileDevice) {
        this.isVisible_cacheMobileDevice = false;
      }
    }
  }

  // PHOTOGRAPHY

  public open_photography(): void {
    this.laboratoryService.desactivation_buttonsPhotography();
    if(this.isCard_open) {
      this.close_openedCard();
    }
    this.isOpen_photography = true;
    this.photography_fadeIn = true;
    if(!this.isCard_open) {
      this.laboratoryService.open_card();
      this.isCard_open = true;
    }
    if(this.isMobileDevice) {
      this.isVisible_cacheMobileDevice = true;
      if(this.isOpen_stereoscopy) {
        this.close_switchCamera();
      }
    }
    if(this.isOpen_movies) {
      this.close_movies(false);
    }
  }

  public close_photography(close_clicked): void {
    this.laboratoryService.activation_buttonsPhotography();
    this.isOpen_photography = false;
    this.photography_fadeIn = false;
    if(close_clicked) {
      this.laboratoryService.close_card();
      this.isCard_open = false;
      if(this.isMobileDevice) {
        this.isVisible_cacheMobileDevice = false;
      }
    }
  }

  // MOVIES

  public open_movies(): void {
    this.laboratoryService.desactivation_buttonsMovies();
    if(this.isCard_open) {
      this.close_openedCard();
    }
    this.isOpen_movies = true;
    this.movies_fadeIn = true;
    this.laboratoryService.animation_openMovies();
    if(this.isMobileDevice) {
      if(this.isOpen_stereoscopy) {
        this.close_switchCamera();
      }
    }
  }

  public close_movies(close_clicked): void {
    this.laboratoryService.activation_buttonsMovies();
    if(close_clicked) {
      this.laboratoryService.animation_closeMovies();
    }
    this.isOpen_movies = false;
    this.movies_fadeIn = false;
    this.laboratoryService.pause_videoTexture();
  }

  public play_videoTexture(): void {
    this.laboratoryService.play_videoTexture();
  }

  public pause_videoTexture(): void {
    this.laboratoryService.pause_videoTexture();
  }

  public skipForward_videoTexture(): void {
    this.laboratoryService.skipForward_videoTexture();
  }

  public mute_videoTexture(): void {
    this.isMuted = !this.isMuted;
    this.laboratoryService.mute_videoTexture();
  }

  // CONTACT ME

  public open_contactMe(): void {
    this.laboratoryService.desactivation_buttonsContactMe();
    if(this.isCard_open) {
      this.close_openedCard();
    }
    this.isOpen_contactMe = true;
    this.contactMe_fadeIn = true;
    if(!this.isCard_open) {
      this.laboratoryService.open_card();
      this.isCard_open = true;
    }
    if(this.isMobileDevice) {
      this.isVisible_cacheMobileDevice = true;
      if(this.isOpen_stereoscopy) {
        this.close_switchCamera();
      }
    }
    if(this.isOpen_movies) {
      this.close_movies(false);
    }
  }

  public close_contactMe(close_clicked): void {
    this.laboratoryService.activation_buttonsContactMe();
    this.isOpen_contactMe = false;
    this.contactMe_fadeIn = false;
    if(close_clicked) {
      this.laboratoryService.close_card();
      this.isCard_open = false;
      if(this.isMobileDevice) {
        this.isVisible_cacheMobileDevice = false;
      }
    }
  }

  // CLOSE OPENED CARD

  private close_openedCard(): void {
    if(this.isOpen_development) {
      this.close_development(false);
    }
    else if(this.isOpen_datas) {
      this.close_datas(false);
    }
    else if(this.isOpen_stereoscopy) {
      this.close_stereoscopy(false);
    }
    else if(this.isOpen_socNet) {
      this.close_socialNetworks(false);
    }
    else if(this.isOpen_photography) {
      this.close_photography(false);
    }
    else if(this.isOpen_movies) {
      this.close_movies(false);
    }
    else if(this.isOpen_contactMe) {
      this.close_contactMe(false);
    }
  }

  // INIT POSITION

  public init_position(): void {
    this.laboratoryService.init_position();
  }

  // CLEAN UP

  public cleanUp_laboratory() {
      this.laboratoryService.cleanUp();
  }
}
