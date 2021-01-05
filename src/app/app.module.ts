import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LaboratoryComponent } from './laboratory/laboratory.component';
import { DevelopmentComponent } from './development/development.component';

@NgModule({
  declarations: [
    AppComponent,
    LaboratoryComponent,
    DevelopmentComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
