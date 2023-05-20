import {ModuleWithProviders, NgModule} from '@angular/core';
import {ModuleConfig} from './module-config';
import {UNSAVED_DATA_CONFIG} from './unsaved-data.config';

@NgModule()
export class HasUnsavedDataModule {
  static config(config: ModuleConfig): ModuleWithProviders<HasUnsavedDataModule> {
    return {
      ngModule: HasUnsavedDataModule,
      providers: [
        config.confirmService,
        {
          provide: UNSAVED_DATA_CONFIG,
          useValue: {
            message: config.message ?? 'There is unsaved data',
            title: config.title,
            ok: config.ok ?? 'Ok',
            cancel: config.cancel ?? 'Cancel',
          }
        },
      ],
    };
  }
}
