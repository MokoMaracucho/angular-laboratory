import { Component, HostListener, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import 'pepjs';

import { DevelopmentService } from './development/services/development.service';
import { LaboratoryService } from './laboratory/services/laboratory.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
      trigger('isOpen_navBarMenu', [
        state('false', style({background: '#00000088'})),
        state('true', style({background: '#000000DD'})),
        transition('false => true', [animate('0.5s')]),
        transition('true => false', [animate('0.2s')])
      ]),
      trigger('open_menuNavBar_item1', [
        state('false', style({background: '#00000000'})),
        state('true', style({background: '#000000DD'})),
        transition('false => true', [animate('0.2s')])
      ]),
      trigger('open_menuNavBar_laboratory', [
        state('false', style({opacity: '0'})),
        state('true', style({opacity: '1'})),
        transition('false => true', [animate('0.2s')])
      ]),
      trigger('open_menuNavBar_item2', [
        state('false', style({background: '#00000000'})),
        state('true', style({background: '#000000DD'})),
        transition('false => true', [animate('0.2s')])
      ]),
      trigger('open_menuNavBar_development', [
        state('false', style({opacity: '0'})),
        state('true', style({opacity: '1'})),
        transition('false => true', [animate('0.2s')])
      ]),
      trigger('open_menuNavBar_item3', [
        state('false', style({background: '#00000000'})),
        state('true', style({background: '#000000DD'})),
        transition('false => true', [animate('0.2s')])
      ]),
      trigger('open_menuNavBar_tutorials', [
        state('false', style({opacity: '0'})),
        state('true', style({opacity: '1'})),
        transition('false => true', [animate('0.2s')])
      ]),
      trigger('open_menuNavBar_item4', [
        state('false', style({background: '#00000000'})),
        state('true', style({background: '#000000DD'})),
        transition('false => true', [animate('0.2s')])
      ]),
      trigger('open_menuNavBar_photography', [
        state('false', style({opacity: '0'})),
        state('true', style({opacity: '1'})),
        transition('false => true', [animate('0.2s')])
      ])
  ]
})
export class AppComponent implements OnInit {

  public innerWidth: any;
  public innerHeight: any;

  public isCV = false;

  public isCollapsed = false;
  public isOpen_navBarMenu = false;
  private open_menuNavBar_item1 = false;
  private open_menuNavBar_laboratory = false;
  private open_menuNavBar_item2 = false;
  private open_menuNavBar_development = false;
  private open_menuNavBar_item3 = false;
  private open_menuNavBar_tutorials = false;
  private open_menuNavBar_item4 = false;
  private open_menuNavBar_photography = false;

  public language_french = false;
  public language_english = true;
  public language_spanish = false;

  constructor(
      private developmentService: DevelopmentService,
      private laboratoryService: LaboratoryService
  ) {}

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    if(this.innerWidth <= 799) {
      this.isCollapsed = true;
    }
    else {
      this.isCollapsed = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    if(this.innerWidth <= 799) {
      this.isCollapsed = true;
    }
    else {
      this.isCollapsed = false;
      this.isOpen_navBarMenu = false;
      this.open_menuNavBar_item1 = false;
      this.open_menuNavBar_laboratory = false;
      this.open_menuNavBar_item2 = false;
      this.open_menuNavBar_development = false;
      this.open_menuNavBar_item3 = false;
      this.open_menuNavBar_tutorials = false;
      this.open_menuNavBar_item4 = false;
      this.open_menuNavBar_photography = false;
    }
  }

  public set_isCV(isCV): void {
    this.isCV = isCV;
  }

  public openClose_navBar_menu(): void {
    this.isOpen_navBarMenu = !this.isOpen_navBarMenu;
    if(this.isOpen_navBarMenu) {
      setTimeout(() => {this.open_menuNavBar_item1 = true}, 100);
      setTimeout(() => {this.open_menuNavBar_laboratory = true}, 100);
      setTimeout(() => {this.open_menuNavBar_item2 = true}, 200);
      setTimeout(() => {this.open_menuNavBar_development = true}, 200);
      setTimeout(() => {this.open_menuNavBar_item3 = true}, 300);
      setTimeout(() => {this.open_menuNavBar_tutorials = true}, 300);
      setTimeout(() => {this.open_menuNavBar_item4 = true}, 400);
      setTimeout(() => {this.open_menuNavBar_photography = true}, 400);
    } else {
      this.open_menuNavBar_item1 = false;
      this.open_menuNavBar_laboratory = false;
      this.open_menuNavBar_item2 = false;
      this.open_menuNavBar_development = false;
      this.open_menuNavBar_item3 = false;
      this.open_menuNavBar_tutorials = false;
      this.open_menuNavBar_item4 = false;
      this.open_menuNavBar_photography = false;
    }

  }

  public cleanUp_development() {
      this.developmentService.cleanUp();
      this.isOpen_navBarMenu = false;
      this.open_menuNavBar_item1 = false;
      this.open_menuNavBar_laboratory = false;
      this.open_menuNavBar_item2 = false;
      this.open_menuNavBar_development = false;
      this.open_menuNavBar_item3 = false;
      this.open_menuNavBar_tutorials = false;
      this.open_menuNavBar_item4 = false;
      this.open_menuNavBar_photography = false;
  }

  public cleanUp_laboratory() {
      this.laboratoryService.cleanUp();
      this.isOpen_navBarMenu = false;
      this.open_menuNavBar_item1 = false;
      this.open_menuNavBar_laboratory = false;
      this.open_menuNavBar_item2 = false;
      this.open_menuNavBar_development = false;
      this.open_menuNavBar_item3 = false;
      this.open_menuNavBar_tutorials = false;
      this.open_menuNavBar_item4 = false;
      this.open_menuNavBar_photography = false;
  }

  public cleanUp_photography() {
      // this.photographyService.cleanUp();
  }

  public cleanUp_shareKnowledge() {
      // this.photographyService.cleanUp();
  }

  public change_language_english(): void {
      this.language_english = true;
      this.language_french = false;
      this.language_spanish = false;
  }

  public change_language_french(): void {
      this.language_english = false;
      this.language_french = true;
      this.language_spanish = false;
  }

  public change_language_spanish(): void {
      this.language_english = false;
      this.language_french = false;
      this.language_spanish = true;
  }
}
