# ScrollHere

Scrolls specified container to the element with this directive when it's condition becomes truthy.

## Installation

```
npm install @kovalenko/scroll-here
```

## Supported API

### Properties

| @Input() | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| ngcScrollHere | boolean | required | | Sets condition when to start scrolling
| ngcScrollContainer | string / HTMLElement	| optional | 'html' | Place this attribute BEFORE [ngcScrollHere] in template. Should get a html element or css selector for a scrollable element; window will be used if this attribute is empty
| ngcScrollDuration | number | optional | 200 | Sets the scroll duration


### Events

| @Output() | Type | Event Type | Required | Description |
| --- | --- | --- | --- | --- |
| ngcScrollTriggered | EventEmitter | void | optional | this will callback if start scrolling condition has been met
| ngcScrollFinished | EventEmitter | void | optional | this will callback if scrolling has been finished

## Usage

First, import the ScrollHereModule to your module:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ScrollHereModule } from '@menelai/scroll-here';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app';

@NgModule({
  imports: [BrowserModule, ScrollHereModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
```

In this example, window will be scrolled to inner div and when **ngcScrollFinished** callback will be invoked the window will be scrolled to outer div 

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <div style="padding-top: 3000px" [ngcScrollHere]="toTop" [ngcScrollDuration]="4000">
      <div [ngcScrollHere]="!triggered && s" [ngcScrollDuration]="2000" (ngcScrollTriggered)="triggered = true" (ngcScrollFinished)="toTop = true">Bottom</div>
    </div>
  `,
})
export class AppComponent {
  s = true;
  triggered = false;
  toTop = false;
}
```

## License

MIT
