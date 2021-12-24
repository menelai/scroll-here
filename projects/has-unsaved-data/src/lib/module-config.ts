import {Provider} from '@angular/core';
import {UnsavedDataConfig} from './unsaved-data-config.interface';

export interface ModuleConfig extends UnsavedDataConfig {
  confirmService: Provider;
}
