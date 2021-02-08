import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ActivatedRoute } from '@angular/router';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { AppComponent } from '../app.component';
import { DevelopmentService } from './services/development.service';
import { InteractionService } from './services/interaction.service';

@Component({
  selector: 'app-development',
  templateUrl: './development.component.html',
  styleUrls: ['./development.component.css'],
  animations: [
    trigger('fadeOut_backgroundIntroduction', [
      state('false', style({background: '#002486'})),
      state('true', style({background: '#00248666'})),
      transition('false => true', [animate('2s')])
    ]),
    trigger('logoDevelopment_fadeIn', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')])
    ]),
    trigger('titleDevelopment_fadeIn', [
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
    trigger('postgresql_fadeIn', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')])
    ]),
    trigger('maven_fadeIn', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')])
    ]),
    trigger('springFramework_fadeIn', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')])
    ]),
    trigger('java_fadeIn', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')])
    ]),
    trigger('ubuntu_fadeIn', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')])
    ]),
    trigger('apache_fadeIn', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')])
    ]),
    trigger('css_fadeIn', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')])
    ]),
    trigger('html_fadeIn', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')])
    ]),
    trigger('bootstrap_fadeIn', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')])
    ]),
    trigger('angular_fadeIn', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')])
    ]),
    trigger('typescript_fadeIn', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')])
    ]),
    trigger('postman_fadeIn', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')])
    ]),
    trigger('docker_fadeIn', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')])
    ]),
    trigger('git_fadeIn', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')])
    ]),
    trigger('blender_fadeIn', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')])
    ]),
    trigger('babylon_fadeIn', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')])
    ]),
    trigger('photoshop_fadeIn', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')])
    ]),
    trigger('illustrator_fadeIn', [
      state('false', style({opacity: '0'})),
      state('true', style({opacity: '1'})),
      transition('false => true', [animate('2s')])
    ])
  ]
})
export class DevelopmentComponent implements OnInit, OnDestroy {

  // DEVICE

  private deviceInfo = null;
  public isMobileDevice;
  public isTabletDevice;
  public isDesktopDevice;

  // WINDOW

  public innerWidth: any;
  public innerHeight: any;

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

  public logoDevelopment_fadeIn = false;
  public titleDevelopment_fadeIn = false;
  public h1Introduction_fadeIn = false;
  public textIntroduction_fadeIn = false;
  public spanLanguageIntroduction_fadeIn = false;
  public btnCloseIntroduction_fadeIn = false;

  public isVisible_initPosition = false;

  public card_open = false;

  public isOpen_postgresql = false;
  public postgresql_fadeIn = false;

  public isOpen_maven = false;
  public maven_fadeIn = false;

  public isOpen_springFramework = false;
  public springFramework_fadeIn = false;

  public isOpen_java = false;
  public java_fadeIn = false;

  public isOpen_ubuntu = false;
  public ubuntu_fadeIn = false;

  public isOpen_apache = false;
  public apache_fadeIn = false;

  public isOpen_css = false;
  public css_fadeIn = false;

  public isOpen_html = false;
  public html_fadeIn = false;

  public isOpen_bootstrap = false;
  public bootstrap_fadeIn = false;

  public isOpen_angular = false;
  public angular_fadeIn = false;

  public isOpen_typescript = false;
  public typescript_fadeIn = false;

  public isOpen_postman = false;
  public postman_fadeIn = false;

  public isOpen_docker = false;
  public docker_fadeIn = false;

  public isOpen_git = false;
  public git_fadeIn = false;

  public isOpen_blender = false;
  public blender_fadeIn = false;

  public isOpen_babylon = false;
  public babylon_fadeIn = false;

  public isOpen_photoshop = false;
  public photoshop_fadeIn = false;

  public isOpen_illustrator = false;
  public illustrator_fadeIn = false;

  public isOpen_contactMe = false;
  public contactMe_fadeIn = false;

  public isOpen_stereoscopy = false;
  public stereoscopy_fadeIn = false;

  public disabledSubmitButton: boolean = true;

  public isVisible_cache = false;

  public anaglyph_activated = false;

  public isVisible_cacheMobileDevice = false;

  @ViewChild('rendererCanvas_development', { static: true })
  public rendererCanvas_development: ElementRef<HTMLCanvasElement>;

  public constructor(
    private activatedRoute: ActivatedRoute,
    private deviceService: DeviceDetectorService,
    private appComponent: AppComponent,
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

    setTimeout(() => {this.logoDevelopment_fadeIn = true}, 1000);
    setTimeout(() => {this.titleDevelopment_fadeIn = true}, 1000);
    setTimeout(() => {this.h1Introduction_fadeIn = true}, 2000);
    setTimeout(() => {this.textIntroduction_fadeIn = true}, 2000);
    setTimeout(() => {this.spanLanguageIntroduction_fadeIn = true}, 3000);

    this.subscription = this.interaction.change_language_english.subscribe(() => this.change_language_english());
    this.subscription = this.interaction.change_language_french.subscribe(() => this.change_language_french());
    this.subscription = this.interaction.change_language_spanish.subscribe(() => this.change_language_spanish());

    this.subscription = this.interaction.open_postgresql.subscribe(() => this.open_postgresql());
    this.subscription = this.interaction.open_java.subscribe(() => this.open_java());
    this.subscription = this.interaction.open_springFramework.subscribe(() => this.open_springFramework());
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
    this.subscription = this.interaction.open_ubuntu.subscribe(() => this.open_ubuntu());
    this.subscription = this.interaction.open_apache.subscribe(() => this.open_apache());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private epicFunction() {
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

  private isLoaded_function(): void {
    this.isLoaded = true;
    this.btnCloseIntroduction_fadeIn = true;
    this.fadeOut_backgroundIntroduction = true;
  }

  public close_introduction(): void {
    this.isOpen_introductionBackground = false;
    this.isOpen_introduction = false;
    this.developmentService.animation_enterDevelopment();
    this.isVisible_initPosition = true;
    this.appComponent.close_navBar_menu();
  }

  // POSTGRESQL

  public open_postgresql(): void {
    this.isOpen_postgresql = true;
    this.postgresql_fadeIn = true;
    this.developmentService.open_card();
    if(this.isMobileDevice) {
      this.isVisible_cacheMobileDevice = true;
    }
  }

  public close_postgresql(): void {
    this.isOpen_postgresql = false;
    this.postgresql_fadeIn = false;
    this.developmentService.close_card();
    if(this.isMobileDevice) {
      this.isVisible_cacheMobileDevice = false;;
    }
  }

  // MAVEN

  public open_maven(): void {
    this.isOpen_maven = true;
    this.maven_fadeIn = true;
    this.developmentService.open_card();
    if(this.isMobileDevice) {
      this.isVisible_cacheMobileDevice = true;
    }
  }

  public close_maven(): void {
    this.isOpen_maven = false;
    this.maven_fadeIn = false;
    this.developmentService.close_card();
    if(this.isMobileDevice) {
      this.isVisible_cacheMobileDevice = false;;
    }
  }

  // SPRING FRAMEWORK

  public open_springFramework(): void {
    this.isOpen_springFramework = true;
    this.springFramework_fadeIn = true;
    this.developmentService.open_card();
    if(this.isMobileDevice) {
      this.isVisible_cacheMobileDevice = true;
    }
  }

  public close_springFramework(): void {
    this.isOpen_springFramework = false;
    this.springFramework_fadeIn = false;
    this.developmentService.close_card();
    if(this.isMobileDevice) {
      this.isVisible_cacheMobileDevice = false;;
    }
  }

  // JAVA

  public open_java(): void {
    this.isOpen_java = true;
    this.java_fadeIn = true;
    this.developmentService.open_card();
    if(this.isMobileDevice) {
      this.isVisible_cacheMobileDevice = true;
    }
  }

  public close_java(): void {
    this.isOpen_java = false;
    this.java_fadeIn = false;
    this.developmentService.close_card();
    if(this.isMobileDevice) {
      this.isVisible_cacheMobileDevice = false;;
    }
  }

  // UBUNTU

  public open_ubuntu(): void {
    this.isOpen_ubuntu = true;
    this.ubuntu_fadeIn = true;
    this.developmentService.open_card();
    if(this.isMobileDevice) {
      this.isVisible_cacheMobileDevice = true;
    }
  }

  public close_ubuntu(): void {
    this.isOpen_ubuntu = false;
    this.ubuntu_fadeIn = false;
    this.developmentService.close_card();
    if(this.isMobileDevice) {
      this.isVisible_cacheMobileDevice = false;;
    }
  }

  // APACHE

  public open_apache(): void {
    this.isOpen_apache = true;
    this.apache_fadeIn = true;
    this.developmentService.open_card();
    if(this.isMobileDevice) {
      this.isVisible_cacheMobileDevice = true;
    }
  }

  public close_apache(): void {
    this.isOpen_apache = false;
    this.apache_fadeIn = false;
    this.developmentService.close_card();
    if(this.isMobileDevice) {
      this.isVisible_cacheMobileDevice = false;;
    }
  }

  // CSS

  public open_css(): void {
    this.isOpen_css = true;
    this.css_fadeIn = true;
    this.developmentService.open_card();
    if(this.isMobileDevice) {
      this.isVisible_cacheMobileDevice = true;
    }
  }

  public close_css(): void {
    this.isOpen_css = false;
    this.css_fadeIn = false;
    this.developmentService.close_card();
    if(this.isMobileDevice) {
      this.isVisible_cacheMobileDevice = false;;
    }
  }

  // HTML

  public open_html(): void {
    this.isOpen_html = true;
    this.html_fadeIn = true;
    this.developmentService.open_card();
    if(this.isMobileDevice) {
      this.isVisible_cacheMobileDevice = true;
    }
  }

  public close_html(): void {
    this.isOpen_html = false;
    this.html_fadeIn = false;
    this.developmentService.close_card();
    if(this.isMobileDevice) {
      this.isVisible_cacheMobileDevice = false;;
    }
  }

  // BOOTSTRAP

  public open_bootstrap(): void {
    this.isOpen_bootstrap = true;
    this.bootstrap_fadeIn = true;
    this.developmentService.open_card();
    if(this.isMobileDevice) {
      this.isVisible_cacheMobileDevice = true;
    }
  }

  public close_bootstrap(): void {
    this.isOpen_bootstrap = false;
    this.bootstrap_fadeIn = false;
    this.developmentService.close_card();
    if(this.isMobileDevice) {
      this.isVisible_cacheMobileDevice = false;;
    }
  }

  // ANGULAR

  public open_angular(): void {
    this.isOpen_angular = true;
    this.angular_fadeIn = true;
    this.developmentService.open_card();
    if(this.isMobileDevice) {
      this.isVisible_cacheMobileDevice = true;
    }
  }

  public close_angular(): void {
    this.isOpen_angular = false;
    this.angular_fadeIn = false;
    this.developmentService.close_card();
    if(this.isMobileDevice) {
      this.isVisible_cacheMobileDevice = false;;
    }
  }

  // TYPESCRIPT

  public open_typescript(): void {
    this.isOpen_typescript = true;
    this.typescript_fadeIn = true;
    this.developmentService.open_card();
    if(this.isMobileDevice) {
      this.isVisible_cacheMobileDevice = true;
    }
  }

  public close_typescript(): void {
    this.isOpen_typescript = false;
    this.typescript_fadeIn = false;
    this.developmentService.close_card();
    if(this.isMobileDevice) {
      this.isVisible_cacheMobileDevice = false;;
    }
  }

  // POSTMAN

  public open_postman(): void {
    this.isOpen_postman = true;
    this.postman_fadeIn = true;
    this.developmentService.open_card();
    if(this.isMobileDevice) {
      this.isVisible_cacheMobileDevice = true;
    }
  }

  public close_postman(): void {
    this.isOpen_postman = false;
    this.postman_fadeIn = false;
    this.developmentService.close_card();
    if(this.isMobileDevice) {
      this.isVisible_cacheMobileDevice = false;;
    }
  }

  // DOCKER

  public open_docker(): void {
    this.isOpen_docker = true;
    this.docker_fadeIn = true;
    this.developmentService.open_card();
    if(this.isMobileDevice) {
      this.isVisible_cacheMobileDevice = true;
    }
  }

  public close_docker(): void {
    this.isOpen_docker = false;
    this.docker_fadeIn = false;
    this.developmentService.close_card();
    if(this.isMobileDevice) {
      this.isVisible_cacheMobileDevice = false;;
    }
  }

  // GIT

  public open_git(): void {
    this.isOpen_git = true;
    this.git_fadeIn = true;
    this.developmentService.open_card();
    if(this.isMobileDevice) {
      this.isVisible_cacheMobileDevice = true;
    }
  }

  public close_git(): void {
    this.isOpen_git = false;
    this.git_fadeIn = false;
    this.developmentService.close_card();
    if(this.isMobileDevice) {
      this.isVisible_cacheMobileDevice = false;;
    }
  }

  // BLENDER

  public open_blender(): void {
    this.isOpen_blender = true;
    this.blender_fadeIn = true;
    this.developmentService.open_card();
    if(this.isMobileDevice) {
      this.isVisible_cacheMobileDevice = true;
    }
  }

  public close_blender(): void {
    this.isOpen_blender = false;
    this.blender_fadeIn = false;
    this.developmentService.close_card();
    if(this.isMobileDevice) {
      this.isVisible_cacheMobileDevice = false;;
    }
  }

  // BABYLON

  public open_babylon(): void {
    this.isOpen_babylon = true;
    this.babylon_fadeIn = true;
    this.developmentService.open_card();
    if(this.isMobileDevice) {
      this.isVisible_cacheMobileDevice = true;
    }
  }

  public close_babylon(): void {
    this.isOpen_babylon = false;
    this.babylon_fadeIn = false;
    this.developmentService.close_card();
    if(this.isMobileDevice) {
      this.isVisible_cacheMobileDevice = false;;
    }
  }

  // PHOTOSHOP

  public open_photoshop(): void {
    this.isOpen_photoshop = true;
    this.photoshop_fadeIn = true;
    this.developmentService.open_card();
    if(this.isMobileDevice) {
      this.isVisible_cacheMobileDevice = true;
    }
  }

  public close_photoshop(): void {
    this.isOpen_photoshop = false;
    this.photoshop_fadeIn = false;
    this.developmentService.close_card();
    if(this.isMobileDevice) {
      this.isVisible_cacheMobileDevice = false;;
    }
  }

  // ILLUSTRATOR

  public open_illustrator(): void {
    this.isOpen_illustrator = true;
    this.illustrator_fadeIn = true;
    this.developmentService.open_card();
    if(this.isMobileDevice) {
      this.isVisible_cacheMobileDevice = true;
    }
  }

  public close_illustrator(): void {
    this.isOpen_illustrator = false;
    this.illustrator_fadeIn = false;
    this.developmentService.close_card();
    if(this.isMobileDevice) {
      this.isVisible_cacheMobileDevice = false;;
    }
  }

  public init_position(): void {
    this.developmentService.init_position();
  }

  private close_openedCard(): void {
    if(this.isOpen_postgresql) {
      this.close_postgresql();
    }
    else if(this.isOpen_maven) {
      this.close_maven();
    }
    else if(this.isOpen_springFramework) {
      this.close_springFramework();
    }
    else if(this.isOpen_java) {
      this.close_java();
    }
    else if(this.isOpen_ubuntu) {
      this.close_ubuntu();
    }
    else if(this.isOpen_apache) {
      this.close_apache();
    }
    else if(this.isOpen_css) {
      this.close_css();
    }
    else if(this.isOpen_html) {
      this.close_html();
    }
    else if(this.isOpen_bootstrap) {
      this.close_bootstrap();
    }
    else if(this.isOpen_angular) {
      this.close_angular();
    }
    else if(this.isOpen_typescript) {
      this.close_typescript();
    }
    else if(this.isOpen_postman) {
      this.close_postman();
    }
    else if(this.isOpen_docker) {
      this.close_docker();
    }
    else if(this.isOpen_git) {
      this.close_git();
    }
    else if(this.isOpen_blender) {
      this.close_blender();
    }
    else if(this.isOpen_babylon) {
      this.close_babylon();
    }
    else if(this.isOpen_photoshop) {
      this.close_photoshop();
    }
    else if(this.isOpen_illustrator) {
      this.close_illustrator();
    }
  }
}
