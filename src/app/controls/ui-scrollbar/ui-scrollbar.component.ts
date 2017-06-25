import * as Ps from 'perfect-scrollbar';

import { Component, DoCheck, OnDestroy, Input, Optional, ElementRef, AfterViewInit, ViewEncapsulation, NgZone } from '@angular/core';

import { UiScrollbarConfig, UiScrollbarConfigInterface } from './ui-scrollbar.interfaces';
import { CustomComponent } from '../../decorators.component';

let metaData = {
  selector: 'ui-scrollbar',
  template: '<div class="ps-content"><ng-content></ng-content></div>',
  styleUrls: ['./ui-scrollbar.component.less'],
  encapsulation: ViewEncapsulation.None
}
@Component(metaData)
//@CustomComponent(metaData)
export class UiScrollbarComponent implements DoCheck, OnDestroy, AfterViewInit {
  private width: number;
  private height: number;

  private contentWidth: number;
  private contentHeight: number;

  @Input() runInsideAngular: boolean = false;

  @Input() config: any;//UiScrollbarConfigInterface;

  constructor( public elementRef: ElementRef, @Optional() private defaults: UiScrollbarConfig, private zone: NgZone ) {}

  ngDoCheck() {
    if (this.elementRef.nativeElement.children && this.elementRef.nativeElement.children.length) {

      let width = this.elementRef.nativeElement.offsetWidth;
      let height = this.elementRef.nativeElement.offsetHeight;

      let contentWidth = this.elementRef.nativeElement.children[0].offsetWidth;
      let contentHeight = this.elementRef.nativeElement.children[0].offsetHeight;

      if (width !== this.width || height !== this.height || contentWidth !== this.contentWidth || contentHeight !== this.contentHeight) {
        this.width = width;
        this.height = height;

        this.contentWidth = contentWidth;
        this.contentHeight = contentHeight;

        this.update();
      }
    }
  }

  ngOnDestroy() {
    if (this.runInsideAngular) {
      Ps.destroy(this.elementRef.nativeElement);
    } else {
      this.zone.runOutsideAngular(() => {
        Ps.destroy(this.elementRef.nativeElement);
      });
    }
  }

  ngAfterViewInit() {
    let config = new UiScrollbarConfig(this.defaults);
    config.assign(this.config);

    if (this.runInsideAngular) {
      Ps.initialize(this.elementRef.nativeElement, config);
    } else {
      this.zone.runOutsideAngular(() => {
        Ps.initialize(this.elementRef.nativeElement, config);
      });
    }
  }

  update() {
    if (this.runInsideAngular) {
      Ps.update(this.elementRef.nativeElement);
    } else {
      this.zone.runOutsideAngular(() => {
        Ps.update(this.elementRef.nativeElement);
      });
    }
  }

  scrollTo(position: number) {
    this.elementRef.nativeElement.scrollTop = position;

    this.update();
  }

  scrollToTop() {
    this.elementRef.nativeElement.scrollTop = 0;

    this.update();
  }

  scrollToBottom() {
    let height = this.elementRef.nativeElement.scrollHeight;

    this.elementRef.nativeElement.scrollTop = height;

    this.update();
  }
}
