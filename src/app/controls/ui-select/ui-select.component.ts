import { Component, Input,AfterViewInit, ViewChild, ElementRef, Output, EventEmitter, ViewEncapsulation, HostListener, forwardRef  } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { CustomComponent } from '../../decorators.component';
const UI_SELECT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => UiSelectComponent),
  multi: true
};

let metaData = {
  selector: 'ui-select',
  template: `

      <div class="value" [class.active]="(on && fromKey.length>0)" >
        <span><span>
            <ng-container *ngIf="comboWhithKey && innerValue">{{innerValue}} - </ng-container>
            <ng-container *ngIf="nullValue">No selected</ng-container>
            <ng-container *ngIf="!nullValue">{{from[innerValue]}}</ng-container>
        </span></span>
      </div>

    <div class="popup" *ngIf="on && fromKey.length>0 &&  !disabled">
        <div>
            <!--  ui-scrollbar  -->
              <div  *ngFor="let key of fromKey" (click)="change(key)" class="item">
                <ng-container *ngIf="comboWhithKey && key">{{key}} - </ng-container>{{from[key]}}
              </div>
            <!--   /ui-scrollbar  -->
        </div>
    </div>
`,
//,encapsulation: ViewEncapsulation.None
  styleUrls: ['./ui-select.component.less'],
  providers: [UI_SELECT_CONTROL_VALUE_ACCESSOR]
}
@Component(metaData)
@CustomComponent(metaData)
export class UiSelectComponent implements ControlValueAccessor, AfterViewInit {
    constructor(private elementRef: ElementRef){

    }
    nullValue:boolean = true
    private hostEvent: any = null;
    @HostListener('document:click', ['$event'])
    private onDocumentClick (event: any) {

        if (event !== this.hostEvent) {
            this.handleClickOutside( event )
        }
    }

    comboWhithKey:boolean = false;


    private localType:string;
    @Input()
    set type(value:string){

        this.localType = value

        if(this.localType == 'string_combo'){
            this.comboWhithKey = true
            return
        }
    };
    get type():string{
        return this.localType
    };
    @Input()
    disabled: boolean = false;
    //сетер на поле ngModel
    @Input() set value(v: any) {
        if (v !== this.innerValue) {
            this.setInnerValue(v)
            this.onChangeCallback(this.innerValue);
        }
    }
    get value(): any {
        return this.innerValue;
    };


    onTouchedCallback = (v: any) => {};
    onChangeCallback = (v: any) => {};
    //вызывается когда изменяем ngModel
    writeValue(value: any): void {
        if (value !== this.innerValue) {
            this.setInnerValue(value)
            this.onChangeCallback(this.innerValue);
        }
    }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
        this.onChangeCallback(this.innerValue);
    }

    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

    @HostListener('click', ['$event'])
    onToggle(event) {
        this.hostEvent = event;
        if(this.on){
            this.hidePopup()
        }else{
            this.showPopup()
        }
        this.onChangeCallback(this.innerValue);
        this.onTouchedCallback(this.innerValue);
    }



    @Input()
    from: any;
    @Input()
    set filter(_filter:any){
        if(!_filter || !_filter.length){
            this.fromKey = Object.keys(this.from);
            return
        }

        this.fromKey = Object.keys(this.from).filter(keyIt => (_filter.includes(keyIt)));
        if(this.fromKey.indexOf(this.innerValue)<0 ){
            this.value = null
        }
    }

    fromKey: Array<any> = [];
    innerValue = null;
    on:boolean;



    ngAfterViewInit() {
        if (!this.fromKey || !this.fromKey.length){
            this.fromKey = Object.keys(this.from);
        }
    }

    private showPopup(){
        if(!this.disabled){
            this.on = true;
        }
    }
    private hidePopup(){
        this.on = false;
    }

    private handleClickOutside(event){
        this.on = false;
    }

    private change(key){
        this.value = key;
    }
    private setInnerValue(_value){
        if (this.fromKey.indexOf(_value)<0) {
            this.innerValue = '';
        } else {
            this.innerValue = _value;
        }

        if (this.innerValue == null || this.innerValue == '') {
            this.nullValue=true
        }else{
            this.nullValue=false
        }
    }
}
