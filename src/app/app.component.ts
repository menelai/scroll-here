import {Component, OnInit} from '@angular/core';
import {DataService} from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  s = false;
  triggered = false;
  toTop = false;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    setTimeout(() => this.s = true, 1000);

    this.dataService.list('1').subscribe(console.log);
    this.dataService.list('2').subscribe(console.log);
    this.dataService.list('2').subscribe(console.log);

    setTimeout(() => {
      this.dataService.list('4').subscribe(console.log);
      this.dataService.refresh$.next('1');
      this.dataService.refresh$.next('6');
    }, 2000);
  }
}