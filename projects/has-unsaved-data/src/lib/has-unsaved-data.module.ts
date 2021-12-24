import {ModuleWithProviders, NgModule} from '@angular/core';
import {HasUnsavedDataGuard} from './has-unsaved-data.guard';
import {ModuleConfig} from './module-config';
import {unsavedDataConfig} from './unsaved-data.config';

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [
    HasUnsavedDataGuard
  ]
})
export class HasUnsavedDataModule {
  static config(config: ModuleConfig): ModuleWithProviders<HasUnsavedDataModule> {
    return {
      ngModule: HasUnsavedDataModule,
      providers: [
        config.confirmService,
        {
          provide: unsavedDataConfig,
          useValue: {
            message: config.message ?? 'There is unsaved data',
            title: config.title,
            ok: config.ok ?? 'Ok',
            cancel: config.cancel ?? 'Cancel',
          }
        },
        HasUnsavedDataGuard
      ],
    };
  }
}
