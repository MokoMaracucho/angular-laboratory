import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
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
        ])
    ]
})
export class DevelopmentComponent implements OnInit, OnDestroy {

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

    public isVisible_cache = false;

    public isVisible_dashBoard = true;
    public camera_datas: CameraDatas;

    @ViewChild('rendererCanvas_development', { static: true })
    public rendererCanvas_development: ElementRef<HTMLCanvasElement>;

    public constructor(
        private developmentService: DevelopmentService,
        readonly interaction: InteractionService
    ) {}

    ngOnInit(): void {
        this.innerWidth = window.innerWidth;
        this.innerHeight = window.innerHeight;
        this.developmentService.set_windowDimensions(this.innerWidth, this.innerHeight);

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

        this.subscription = this.interaction.toogle_cache.subscribe(() => this.toogle_cache());

        this.subscription = this.interaction.getCameraDatas_init.subscribe((cameraDatas: CameraDatas) => cameraDatas);
        this.camera_datas = this.developmentService.emitCameraDatas_init();
        this.subscription = this.interaction.getCameraDatas_loop.subscribe(() => this.getCameraDatas_loop());
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.innerWidth = window.innerWidth;
        this.innerHeight = window.innerHeight;
        this.developmentService.set_windowDimensions(window.innerWidth, window.innerHeight);
    }

    private isLoaded_function(): void {
        this.isLoaded = true;
        this.isLoaded_fadeOut = true;
    }

    public close_introduction(): void {
        this.isVisible_introductionBackground = false;
        this.isVisible_introduction = false;
        this.toogle_cache();
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

    private open_postgresql(): void {
        setTimeout(() => {
            this.isVisible_postgresql = true;
        }, 1000);
    }

    public close_postgresql(): void {
        this.developmentService.animation_closeCard();
        this.isVisible_postgresql = false;
        this.toogle_cache();
    }

    private open_java(): void {
        setTimeout(() => {
            this.isVisible_java = true;
        }, 1000);
    }

    public close_java(): void {
        this.developmentService.animation_closeCard();
        this.isVisible_java = false;
        this.toogle_cache();
    }

    private open_spring_framework(): void {
        setTimeout(() => {
            this.isVisible_spring_framework = true;
        }, 1000);
    }

    public close_spring_framework(): void {
        this.developmentService.animation_closeCard();
        this.isVisible_spring_framework = false;
        this.toogle_cache();
    }

    private open_maven(): void {
        setTimeout(() => {
            this.isVisible_maven = true;
        }, 1000);
    }

    public close_maven(): void {
        this.developmentService.animation_closeCard();
        this.isVisible_maven = false;
        this.toogle_cache();
    }

    private open_css(): void {
        setTimeout(() => {
            this.isVisible_css = true;
        }, 1000);
    }

    public close_css(): void {
        this.developmentService.animation_closeCard();
        this.isVisible_css = false;
        this.toogle_cache();
    }

    private open_html(): void {
        setTimeout(() => {
            this.isVisible_html = true;
        }, 1000);
    }

    public close_html(): void {
        this.developmentService.animation_closeCard();
        this.isVisible_html = false;
        this.toogle_cache();
    }

    private open_bootstrap(): void {
        setTimeout(() => {
            this.isVisible_bootstrap = true;
        }, 1000);
    }

    public close_bootstrap(): void {
        this.developmentService.animation_closeCard();
        this.isVisible_bootstrap = false;
        this.toogle_cache();
    }

    private open_angular(): void {
        setTimeout(() => {
            this.isVisible_angular = true;
        }, 1000);
    }

    public close_angular(): void {
        this.developmentService.animation_closeCard();
        this.isVisible_angular = false;
        this.toogle_cache();
    }

    private open_typescript(): void {
        setTimeout(() => {
            this.isVisible_typescript = true;
        }, 1000);
    }

    public close_typescript(): void {
        this.developmentService.animation_closeCard();
        this.isVisible_typescript = false;
        this.toogle_cache();
    }

    private open_postman(): void {
        setTimeout(() => {
            this.isVisible_postman = true;
        }, 1000);
    }

    public close_postman(): void {
        this.developmentService.animation_closeCard();
        this.isVisible_postman = false;
        this.toogle_cache();
    }

    private open_docker(): void {
        setTimeout(() => {
            this.isVisible_docker = true;
        }, 1000);
    }

    public close_docker(): void {
        this.developmentService.animation_closeCard();
        this.isVisible_docker = false;
        this.toogle_cache();
    }

    private open_git(): void {
        setTimeout(() => {
            this.isVisible_git = true;
        }, 1000);
    }

    public close_git(): void {
        this.developmentService.animation_closeCard();
        this.isVisible_git = false;
        this.toogle_cache();
    }

    private open_blender(): void {
        setTimeout(() => {
            this.isVisible_blender = true;
        }, 1000);
    }

    public close_blender(): void {
        this.developmentService.animation_closeCard();
        this.isVisible_blender = false;
        this.toogle_cache();
    }

    private open_babylon(): void {
        setTimeout(() => {
            this.isVisible_babylon = true;
        }, 1000);
    }

    public close_babylon(): void {
        this.developmentService.animation_closeCard();
        this.isVisible_babylon = false;
        this.toogle_cache();
    }

    private open_photoshop(): void {
        setTimeout(() => {
            this.isVisible_photoshop = true;
        }, 1000);
    }

    public close_photoshop(): void {
        this.developmentService.animation_closeCard();
        this.isVisible_photoshop = false;
        this.toogle_cache();
    }

    private open_illustrator(): void {
        setTimeout(() => {
            this.isVisible_illustrator = true;
        }, 1000);
    }

    public close_illustrator(): void {
        this.developmentService.animation_closeCard();
        this.isVisible_illustrator = false;
        this.toogle_cache();
    }

    private toogle_cache(): void {
        this.isVisible_cache = !this.isVisible_cache;
    }

    private getCameraDatas_loop(): void {
        this.camera_datas = this.developmentService.emitCameraDatas_init();
    }
}
