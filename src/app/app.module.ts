import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LaboratoryComponent } from './laboratory/laboratory.component';
import { LaboratoryModule } from './laboratory/laboratory.module';
import { DevelopmentComponent } from './development/development.component';
import { DevelopmentModule } from './development/development.module';
import { WindowRefService } from './shared/services/window-ref.service';

@NgModule({
    declarations: [
      AppComponent,
      LaboratoryComponent,
      DevelopmentComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        LaboratoryModule,
        DevelopmentModule,
        AppRoutingModule
    ],
    providers: [
      WindowRefService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
