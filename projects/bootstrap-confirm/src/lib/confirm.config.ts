import { InjectionToken } from '@angular/core';
import {BootstrapConfirmConfig} from './bootstrap-confirm-config.interface';


export const config: InjectionToken<BootstrapConfirmConfig> = new InjectionToken('bootstrap-confirm');
