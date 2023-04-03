import {Component, OnInit} from '@angular/core';
import {DateTime} from "luxon";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  s = false;
  triggered = false;
  toTop = false;
  date: DateTime | null = DateTime.now();

  min = DateTime.fromISO('2023-04-04');
  color!: string;

  constructor() {
  }

  ngOnInit() {

  }

  submit() { }


}
