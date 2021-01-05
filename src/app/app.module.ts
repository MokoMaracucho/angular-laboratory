import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

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
    BrowserModule,
    RouterModule.forRoot([
      { path: 'laboratory', component: LaboratoryComponent },
      { path: '', redirectTo: 'laboratory', pathMatch: 'full' },
      { path: 'development', component: DevelopmentComponent },
      { path: '**', redirectTo: 'laboratory', pathMatch: 'full' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
