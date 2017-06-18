import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiButtonComponent } from './button/button.component';
import { UiSelectComponent } from './ui-select/ui-select.component';
import { UiRadioComponent } from './radio/radio.component';

let  declarations = [
      UiButtonComponent,
      UiSelectComponent,
      UiRadioComponent
]
@NgModule({
  declarations: declarations,
  imports: [CommonModule],
  exports:  declarations,
  providers: []
})
export class ControlsModule {}
