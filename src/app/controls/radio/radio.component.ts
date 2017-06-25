import { Component, Input, Output, EventEmitter, HostListener, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { CustomComponent } from '../../decorators.component';
const UI_RADIO_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => UiRadioComponent),
  multi: true
};
/*
 size = [large, medium, small]
*/
let metaData = {
  selector: 'ui-radio',
  template: `
  <span class="radio"
  [class.checked]="checked"
  [class.disabled]="disabled"
  [class.radio-large]="size === 'large'"
  [class.radio-medium]="size === 'medium'"
  [class.radio-small]="size === 'small'">
  <small>
  </small>
  </span>
  `,
  styleUrls: ['./radio.component.less'],
  providers: [UI_RADIO_CONTROL_VALUE_ACCESSOR]
}
@Component(metaData)
@CustomComponent(metaData)
export class UiRadioComponent implements ControlValueAccessor {
  private onTouchedCallback = (v: any) => {
  };
  private onChangeCallback = (v: any) => {
  };

  private _checked: boolean;
  private _disabled: boolean;
  private innerValue: any = '';

  @Input() set checked(v: boolean) {
    this._checked = v !== false;
  }

  get checked() {
    return this._checked;
  }

  @Input() set disabled(v: boolean) {
    this._disabled = v !== false;
  };

  get disabled() {
    return this._disabled;
  }
  //гетер на поле ngModel
  get value(): any {
      return this.innerValue;
  };

  //сетер на поле ngModel
  @Input() set value(v: any) {
      if (v !== this.innerValue) {
          this.innerValue = v;
          this.onChangeCallback(v);
      }
  }

  @Input() size: string = 'medium';
  @Output() change = new EventEmitter<any>();
  @Input() color: string = '';
  @Input() radioOffColor: string = '';
  @Input() radioColor: string = '';
  defaultBgColor: string = '#fff';
  defaultBoColor: string = '#dfdfdf';
  //вызывается по клику
  @HostListener('click')
  onToggle() {
    if (this.disabled){
      return;
    }
    if(!this.checked) {
      this.checked = true;
    }
    this.change.emit(this.innerValue);
    this.onChangeCallback(this.innerValue);
    this.onTouchedCallback(this.innerValue);
  }
  //вызывается когда изменяем ngModel
  writeValue(value: any): void {
    if (value && this.innerValue && value !== this.innerValue) {
        this.checked = false;
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
    if(this.checked) {
      this.onChangeCallback(this.innerValue);
    }
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
}
