export interface UiScrollbarConfigInterface {
  wheelSpeed?: number;
  wheelPropagation?: boolean;
  swipePropagation?: boolean;
  minScrollbarLength?: number;
  maxScrollbarLength?: number;
  useBothWheelAxes?: boolean;
  suppressScrollX?: boolean;
  suppressScrollY?: boolean;
  scrollXMarginOffset?: number;
  scrollYMarginOffset?: number;
  stopPropagationOnClick?: boolean;
}

export class UiScrollbarConfig implements UiScrollbarConfigInterface {
  public wheelSpeed: number;
  public wheelPropagation: boolean;
  public swipePropagation: boolean;
  public minScrollbarLength: number;
  public maxScrollbarLength: number;
  public useBothWheelAxes: boolean;
  public suppressScrollX: boolean;
  public suppressScrollY: boolean;
  public scrollXMarginOffset: number;
  public scrollYMarginOffset: number;
  public stopPropagationOnClick: boolean;

  constructor(config: UiScrollbarConfigInterface = {}) {
    this.assign(config);
  }

  public assign(config: UiScrollbarConfigInterface = {}) {
    for (var key in config) {
      this[key] = config[key];
    }
  }
}
