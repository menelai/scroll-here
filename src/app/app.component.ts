import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
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

  constructor() {
  }

  ngOnInit() {

  }

  submit() { }


}
