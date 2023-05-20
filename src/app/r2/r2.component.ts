import { Component, OnInit } from '@angular/core';
import {UnsavedDataChecker} from 'has-unsaved-data';

@Component({
  selector: 'app-r2',
  templateUrl: './r2.component.html',
  styleUrls: ['./r2.component.scss']
})
export class R2Component implements OnInit {

  constructor() { }

  @UnsavedDataChecker()
  has(): boolean {
    return true;
  }

  ngOnInit(): void {
  }

  jaj(): string {
    return 'jop';
  }

}
