import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiButtonComponent } from './button/button.component';
import { UiSelectComponent } from './ui-select/ui-select.component';
import { UiRadioComponent } from './radio/radio.component';
import { CustomNgModule } from '../decorators.component';
//import { UiScrollbarModule } from './ui-scrollbar';

let  declarations = [
      UiButtonComponent,
      UiSelectComponent,
      UiRadioComponent
]
let metaData = {
  declarations: declarations,
  imports: [
      CommonModule,
     // UiScrollbarModule
  ],
  exports:  declarations,
  providers: []
}
@NgModule(metaData)
@CustomNgModule(metaData)
export class ControlsModule {}
