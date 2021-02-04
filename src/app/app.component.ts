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
    trigger('isOpen_menuNavBar', [
      state('false', style({background: '#00000000'})),
      state('true', style({background: '#000000FF'})),
      transition('false => true', [animate('0.2s')])
    ]),
    trigger('isOpen_menuNavBar_2', [
      state('false', style({background: '#00000088'})),
      state('true', style({background: '#000000FF'})),
      transition('false => true', [animate('0.1s')])
    ])
  ]
})
export class AppComponent implements OnInit {

  public innerWidth: any;
  public innerHeight: any;

  public isCV = false;

  public isCollapsed = false;
  public isOpen_menuNavBar = false;
  public isOpen_menuNavBar_2 = false;

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
      this.isOpen_menuNavBar = false;
      this.isOpen_menuNavBar_2 = false;
    }
  }

  public set_isCV(isCV): void {
    this.isCV = isCV;
  }

  public openClose_navBar_menu(): void {
    this.isOpen_menuNavBar = !this.isOpen_menuNavBar;
    this.isOpen_menuNavBar_2 = !this.isOpen_menuNavBar_2;
  }

  public cleanUp_development() {
      this.developmentService.cleanUp();
      this.isOpen_menuNavBar = false;
      this.isOpen_menuNavBar_2 = false;
  }

  public cleanUp_laboratory() {
      this.laboratoryService.cleanUp();
      this.isOpen_menuNavBar = false;
      this.isOpen_menuNavBar_2 = false;
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
