import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ControlsModule } from './controls/controls.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ControlsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
