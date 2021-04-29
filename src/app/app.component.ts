import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  s = false;
  triggered = false;
  toTop = false;

  ngOnInit() {
    setTimeout(() => this.s = true, 1000);
  }
}
