import { CommonModule } from '@angular/common';

import { NgModule, ModuleWithProviders, OpaqueToken, Optional, SkipSelf, Inject } from '@angular/core';

import { UiScrollbarComponent } from './ui-scrollbar.component';
import { UiScrollbarConfig, UiScrollbarConfigInterface } from './ui-scrollbar.interfaces';

export const PERFECT_SCROLLBAR_GUARD = new OpaqueToken('PERFECT_SCROLLBAR_GUARD');
export const PERFECT_SCROLLBAR_CONFIG = new OpaqueToken('PERFECT_SCROLLBAR_CONFIG');
import { CustomNgModule } from '../../decorators.component';

let metaData = {
    imports: [CommonModule],
    declarations: [UiScrollbarComponent],
    exports: [CommonModule, UiScrollbarComponent]
}
@NgModule(metaData)
@CustomNgModule(metaData)
export class UiScrollbarModule {
  constructor (@Optional() @Inject(PERFECT_SCROLLBAR_GUARD) guard: any) {}

  static forRoot(config?: UiScrollbarConfigInterface): ModuleWithProviders {
    return {
      ngModule: UiScrollbarModule,
      providers: [
        {
          provide: PERFECT_SCROLLBAR_GUARD,
          useFactory: provideForRootGuard,
          deps: [
            [
              UiScrollbarConfig,
              new Optional(),
              new SkipSelf()
            ]
          ]
        },
        {
          provide: PERFECT_SCROLLBAR_CONFIG,
          useValue: config ? config : {}
        },
        {
          provide: UiScrollbarConfig,
          useFactory: provideDefaultConfig,
          deps: [
            PERFECT_SCROLLBAR_CONFIG
          ]
        }
      ]
    };
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: UiScrollbarModule
    };
  }
}

export function provideForRootGuard(config: UiScrollbarConfig): any {
  if (config) {
    throw new Error(`
      Application called UiScrollbarModule.forRoot() twice.
      For submodules use UiScrollbarModule.forChild() instead.
    `);
  }

  return 'guarded';
}

export function provideDefaultConfig(config: UiScrollbarConfigInterface): UiScrollbarConfig {
  return new UiScrollbarConfig(config);
}
