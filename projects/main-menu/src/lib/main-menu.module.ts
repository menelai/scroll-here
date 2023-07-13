import {ModuleWithProviders, NgModule, Provider} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MainMenuService} from './main-menu.service';
import {MainMenuTitleService} from './main-menu-title-service';
import {Title} from '@angular/platform-browser';

@NgModule({
  imports: [
    RouterModule.forChild([])
  ],
  providers: [
    MainMenuService
  ]
})
export class MainMenuModule {
  static config(titleService: Provider): ModuleWithProviders<MainMenuModule> {
    return {
      ngModule: MainMenuModule,
      providers: [
        titleService || {
          provide: MainMenuTitleService,
          useFactory: function() {
            return new Title(document);
          },
        },
        MainMenuService
      ],
    };
  }
}
