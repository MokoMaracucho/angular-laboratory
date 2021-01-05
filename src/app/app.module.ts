import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LaboratoryComponent } from './laboratory/laboratory.component';

@NgModule({
  declarations: [
    AppComponent,
    LaboratoryComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
