import { Component, Input, Output, EventEmitter, HostListener, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

/*
 size = [large, medium, small]
*/
@Component({
  selector: 'ui-button',
  template: `
      <button type="button" class="button" [disabled]="disabled"><ng-content></ng-content></button>
  `,
  styleUrls: ['./button.component.less'],
})
//
export class UiButtonComponent  {

    @Input()
    disabled: boolean = false;

}
