import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LaboratoryComponent } from './laboratory/laboratory.component';
import { LaboratoryModule } from './laboratory/laboratory.module';
import { DevelopmentComponent } from './development/development.component';
import { DevelopmentModule } from './development/development.module';

@NgModule({
    declarations: [
      AppComponent,
      LaboratoryComponent,
      DevelopmentComponent
    ],
    imports: [
        BrowserModule,
        LaboratoryModule,
        DevelopmentModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
