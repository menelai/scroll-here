import {Component, OnInit} from '@angular/core';
import {DataService} from './data.service';
import * as moment from 'moment';
import {MainMenuService} from 'main-menu';
import {take} from 'rxjs/operators';
import {UnsavedDataChecker} from 'has-unsaved-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  s = false;
  triggered = false;
  toTop = false;
  date = moment();
  color!: string;

  constructor(private dataService: DataService, private mainMenu: MainMenuService) {
  }

  ngOnInit() {
    // setTimeout(() => this.s = true, 1000);
    console.log(this.mainMenu.items);

    this.dataService.list('1').subscribe(console.log);
    this.dataService.list('2').subscribe(console.log);
    this.dataService.list('2').subscribe(console.log);
    const subs = this.dataService.list('22').pipe().subscribe(console.log);

    setTimeout(() => {
      this.dataService.list('4').subscribe(console.log);
      this.dataService.list('2').subscribe(console.log);
      this.dataService.list('22').pipe(take(1)).subscribe(console.log);
      //this.dataService.refresh$.next('1');
      //this.dataService.refresh$.next('6');
    }, 2000);

    setTimeout(() => {
      subs.unsubscribe();
      console.log((this.dataService as any)._____storage_____);
    }, 4000);
  }

  submit() { }

  @UnsavedDataChecker()
  has(): boolean {
    return true;
  }
}
