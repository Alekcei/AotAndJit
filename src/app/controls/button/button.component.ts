import { Component, Input, Output, EventEmitter, HostListener, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { CustomComponent } from '../../decorators.component';
/*
 size = [large, medium, small]
*/

let metaData = {
  selector: 'ui-button',
  template: `
      <button type="button" class="button" [disabled]="disabled"><ng-content></ng-content></button>
  `,
  styleUrls: ['./button.component.less'],
}
@Component(metaData)
@CustomComponent(metaData)
export class UiButtonComponent  {

    @Input()
    disabled: boolean = false;

}
