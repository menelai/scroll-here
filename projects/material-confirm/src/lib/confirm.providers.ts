import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { MaterialConfirmConfig } from './material-confirm-config.interface';
import { config as CONFIRM_CONFIG_TOKEN } from './confirm.config';

export function provideMaterialConfirm(
  conf?: MaterialConfirmConfig
): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: CONFIRM_CONFIG_TOKEN,
      useValue: conf
    }
  ]);
}
