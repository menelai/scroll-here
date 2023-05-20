import { InjectionToken } from '@angular/core';
import {UnsavedDataConfig} from './unsaved-data-config.interface';

export const UNSAVED_DATA_CONFIG: InjectionToken<UnsavedDataConfig> = new InjectionToken('UNSAVED_DATA_CONFIG');
