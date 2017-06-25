import { Component,       NgModule } from '@angular/core';

export function CustomComponent(annotation: any) {
  return function (target: Function) {
    //var parentTarget = annotation.parent;
    let metaData = new Component(annotation)
    Component(metaData)(target)
  }
}

export function CustomNgModule(annotation: any) {
  return function (target: Function) {
    //var parentTarget = annotation.parent;
    let metaData = new NgModule(annotation)
    NgModule(metaData)(target)
  }
}
