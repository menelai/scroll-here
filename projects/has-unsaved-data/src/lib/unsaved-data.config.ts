import { InjectionToken } from '@angular/core';
import {UnsavedDataConfig} from './unsaved-data-config.interface';

export const unsavedDataConfig: InjectionToken<UnsavedDataConfig> = new InjectionToken('unsaved-data');
