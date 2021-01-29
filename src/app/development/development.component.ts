import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ActivatedRoute } from '@angular/router';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { DevelopmentService } from './services/development.service';
import { InteractionService } from './services/interaction.service';

import { ConnectionService } from '../shared/services/connection.service';

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
    ]),
    trigger('isVisible_postgresql', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')]),
      transition('true => false', [animate('1s')])
    ]),
    trigger('isVisible_java', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')]),
      transition('true => false', [animate('1s')])
    ]),
    trigger('isVisible_spring_framework', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')]),
      transition('true => false', [animate('1s')])
    ]),
    trigger('isVisible_maven', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')]),
      transition('true => false', [animate('1s')])
    ]),
    trigger('isVisible_css', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')]),
      transition('true => false', [animate('1s')])
    ]),
    trigger('isVisible_html', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')]),
      transition('true => false', [animate('1s')])
    ]),
    trigger('isVisible_bootstrap', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')]),
      transition('true => false', [animate('1s')])
    ]),
    trigger('isVisible_angular', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')]),
      transition('true => false', [animate('1s')])
    ]),
    trigger('isVisible_typescript', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')]),
      transition('true => false', [animate('1s')])
    ]),
    trigger('isVisible_postman', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')]),
      transition('true => false', [animate('1s')])
    ]),
    trigger('isVisible_docker', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')]),
      transition('true => false', [animate('1s')])
    ]),
    trigger('isVisible_git', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')]),
      transition('true => false', [animate('1s')])
    ]),
    trigger('isVisible_blender', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')]),
      transition('true => false', [animate('1s')])
    ]),
    trigger('isVisible_babylon', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')]),
      transition('true => false', [animate('1s')])
    ]),
    trigger('isVisible_photoshop', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')]),
      transition('true => false', [animate('1s')])
    ]),
    trigger('isVisible_illustrator', [
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
    trigger('isVisible_ubuntu', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')]),
      transition('true => false', [animate('1s')])
    ]),
    trigger('isVisible_apache', [
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
    trigger('isVisible_initPosition', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')])
    ])
  ]
})
export class DevelopmentComponent implements OnInit, OnDestroy {

  private isCV: boolean;

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

  public isVisible_initPosition = false;

  public isVisible_postgresql = false;
  public isVisible_java = false;
  public isVisible_spring_framework = false;
  public isVisible_maven = false;
  public isVisible_css = false;
  public isVisible_html = false;
  public isVisible_bootstrap = false;
  public isVisible_angular = false;
  public isVisible_typescript = false;
  public isVisible_postman = false;
  public isVisible_docker = false;
  public isVisible_git = false;
  public isVisible_blender = false;
  public isVisible_babylon = false;
  public isVisible_photoshop = false;
  public isVisible_illustrator = false;
  public isVisible_contactMe = false;
  public isVisible_stereoscopy = false;
  public isVisible_ubuntu = false;
  public isVisible_apache = false;

  public contactForm = new FormGroup({
    contactFormName: new FormControl(''),
    contactFormEmail: new FormControl(''),
    contactFormSubjects: new FormControl(''),
    contactFormMessage: new FormControl('')
  });

  public disabledSubmitButton: boolean = true;

  public isVisible_cache = false;

  public isVisible_dashBoard = false;
  public camera_datas: CameraDatas;

  public anaglyph_activated = false;

  @ViewChild('rendererCanvas_development', { static: true })
  public rendererCanvas_development: ElementRef<HTMLCanvasElement>;

  public constructor(
    private activatedRoute: ActivatedRoute,
    private deviceService: DeviceDetectorService,
    private connectionService: ConnectionService,
    private developmentService: DevelopmentService,
    readonly interaction: InteractionService
  ) {}

  ngOnInit(): void {
    this.epicFunction();
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    this.developmentService.set_windowDimensions(this.innerWidth, this.innerHeight);

    this.isCV = this.activatedRoute.snapshot.params.isCV;
    if(!this.isCV) {
      this.isCV = false;
    }

    this.developmentService.createScene(this.rendererCanvas_development);
    this.developmentService.animate();

    this.subscription = this.interaction.isLoaded.subscribe(() => this.isLoaded_function());

    setTimeout(() => {this.webDeveloper_fadeIn = true}, 500);
    setTimeout(() => {this.introduction_fadeIn = true}, 1000);
    setTimeout(() => {this.btnCloseIntroduction_fadeIn = true}, 1500);

    this.subscription = this.interaction.change_language_english.subscribe(() => this.change_language_english());
    this.subscription = this.interaction.change_language_french.subscribe(() => this.change_language_french());
    this.subscription = this.interaction.change_language_spanish.subscribe(() => this.change_language_spanish());

    this.subscription = this.interaction.open_postgresql.subscribe(() => this.open_postgresql());
    this.subscription = this.interaction.open_java.subscribe(() => this.open_java());
    this.subscription = this.interaction.open_spring_framework.subscribe(() => this.open_spring_framework());
    this.subscription = this.interaction.open_maven.subscribe(() => this.open_maven());
    this.subscription = this.interaction.open_css.subscribe(() => this.open_css());
    this.subscription = this.interaction.open_html.subscribe(() => this.open_html());
    this.subscription = this.interaction.open_bootstrap.subscribe(() => this.open_bootstrap());
    this.subscription = this.interaction.open_angular.subscribe(() => this.open_angular());
    this.subscription = this.interaction.open_typescript.subscribe(() => this.open_typescript());
    this.subscription = this.interaction.open_postman.subscribe(() => this.open_postman());
    this.subscription = this.interaction.open_docker.subscribe(() => this.open_docker());
    this.subscription = this.interaction.open_git.subscribe(() => this.open_git());
    this.subscription = this.interaction.open_blender.subscribe(() => this.open_blender());
    this.subscription = this.interaction.open_babylon.subscribe(() => this.open_babylon());
    this.subscription = this.interaction.open_photoshop.subscribe(() => this.open_photoshop());
    this.subscription = this.interaction.open_illustrator.subscribe(() => this.open_illustrator());
    this.subscription = this.interaction.open_contactMe.subscribe(() => this.open_contactMe());
    this.subscription = this.interaction.open_stereoscopy.subscribe(() => this.open_stereoscopy());
    this.subscription = this.interaction.open_ubuntu.subscribe(() => this.open_ubuntu());
    this.subscription = this.interaction.open_apache.subscribe(() => this.open_apache());

    this.subscription = this.interaction.getCameraDatas_init.subscribe((cameraDatas: CameraDatas) => cameraDatas);
    this.camera_datas = this.developmentService.emitCameraDatas_init();
    // this.subscription = this.interaction.getCameraDatas_loop.subscribe(() => this.getCameraDatas_loop());
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

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    this.developmentService.set_windowDimensions(window.innerWidth, window.innerHeight);
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

  private isLoaded_function(): void {
    this.isLoaded = true;
    this.isLoaded_fadeOut = true;
  }

  public close_introduction(): void {
    this.isVisible_introductionBackground = false;
    this.isVisible_introduction = false;
    this.developmentService.animation_enterDevelopment();
    this.isVisible_initPosition = true;
  }

  private open_postgresql(): void {
    this.isVisible_postgresql = true;
  }

  public close_postgresql(): void {
    this.developmentService.activation_buttons();
    this.isVisible_postgresql = false;
  }

  private open_java(): void {
    this.isVisible_java = true;
  }

  public close_java(): void {
    this.developmentService.activation_buttons();
    this.isVisible_java = false;
  }

  private open_spring_framework(): void {
    this.isVisible_spring_framework = true;
  }

  public close_spring_framework(): void {
    this.developmentService.activation_buttons();
    this.isVisible_spring_framework = false;
  }

  private open_maven(): void {
    this.isVisible_maven = true;
  }

  public close_maven(): void {
    this.developmentService.activation_buttons();
    this.isVisible_maven = false;
  }

  private open_css(): void {
    this.isVisible_css = true;
  }

  public close_css(): void {
    this.developmentService.activation_buttons();
    this.isVisible_css = false;
  }

  private open_html(): void {
    this.isVisible_html = true;
  }

  public close_html(): void {
    this.developmentService.activation_buttons();
    this.isVisible_html = false;
  }

  private open_bootstrap(): void {
    this.isVisible_bootstrap = true;
  }

  public close_bootstrap(): void {
    this.developmentService.activation_buttons();
    this.isVisible_bootstrap = false;
  }

  private open_angular(): void {
    this.isVisible_angular = true;
  }

  public close_angular(): void {
    this.developmentService.activation_buttons();
    this.isVisible_angular = false;
  }

  private open_typescript(): void {
    this.isVisible_typescript = true;
  }

  public close_typescript(): void {
    this.developmentService.activation_buttons();
    this.isVisible_typescript = false;
  }

  private open_postman(): void {
    this.isVisible_postman = true;
  }

  public close_postman(): void {
    this.developmentService.activation_buttons();
    this.isVisible_postman = false;
  }

  private open_docker(): void {
    this.isVisible_docker = true;
  }

  public close_docker(): void {
    this.developmentService.activation_buttons();
    this.isVisible_docker = false;
  }

  private open_git(): void {
    this.isVisible_git = true;
  }

  public close_git(): void {
    this.developmentService.activation_buttons();
    this.isVisible_git = false;
  }

  private open_blender(): void {
    this.isVisible_blender = true;
  }

  public close_blender(): void {
    this.developmentService.activation_buttons();
    this.isVisible_blender = false;
  }

  private open_babylon(): void {
    this.isVisible_babylon = true;
  }

  public close_babylon(): void {
    this.developmentService.activation_buttons();
    this.isVisible_babylon = false;
  }

  private open_photoshop(): void {
    this.isVisible_photoshop = true;
  }

  public close_photoshop(): void {
    this.developmentService.activation_buttons();
    this.isVisible_photoshop = false;
  }

  private open_illustrator(): void {
    this.isVisible_illustrator = true;
  }

  public close_illustrator(): void {
    this.developmentService.activation_buttons();
    this.isVisible_illustrator = false;
  }

  private open_contactMe(): void {
    this.isVisible_contactMe = true;
  }

  public close_contactMe(): void {
    this.developmentService.activation_buttons();
    this.isVisible_contactMe = false;
  }

  private open_ubuntu(): void {
    this.isVisible_ubuntu = true;
  }

  public close_ubuntu(): void {
    this.developmentService.activation_buttons();
    this.isVisible_ubuntu = false;
  }

  private open_apache(): void {
    this.isVisible_apache = true;
  }

  public close_apache(): void {
    this.developmentService.activation_buttons();
    this.isVisible_apache = false;
  }

  public init_position(): void {
    this.developmentService.init_position();
  }

  private open_stereoscopy(): void {
    this.isVisible_stereoscopy = true;
  }

  public animation_switch_camera(): void {
    this.developmentService.animation_switch_camera();
    this.toogle_anaglyph_activated();
  }

  private toogle_anaglyph_activated() {
    this.anaglyph_activated = !this.anaglyph_activated;
  }

  public close_stereoscopy(): void {
    this.developmentService.activation_buttons();
    this.isVisible_stereoscopy = false;
  }
}
