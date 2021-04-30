import { InjectionToken } from '@angular/core';
import {MaterialConfirmConfig} from './material-confirm-config.interface';


export const config: InjectionToken<MaterialConfirmConfig> = new InjectionToken('material-confirm');
