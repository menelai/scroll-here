# MaterialConfirm

Confirm service and directive with material dialog

## Installation

```
npm install @kovalenko/material-confirm
```

### Directive

Selector: `(confirm)`

#### Properties

Name | Description
--- | ---
`@Input() confirmTitle: string` | Dialog title
`@Input() confirmMessage: string` | Confirm message
`@Input() confirmOk: string` | Ok button text
`@Input() confirmCancel: string` | Cancel button text
`@Output() confirm: EventEmitter<any>` | This will callback if Ok button clicked


### Service

`ConfirmService`

Calls confirmation dialog programmatically

#### Methods

<table>
  <tr>
    <th colspan="2"><code>confirm: Promise&lt;boolean&gt;</code></th>
  </tr>
  <tr>
    <td colspan="2">Action confirm</td>
  </tr>
  <tr>
    <th colspan="2">Arguments</th>
  </tr>
  <tr>
    <td><code>confirmMessage: string</code></td>
    <td>Confirm message</td>
  </tr>
  <tr>
    <td><code>confirmTitle?: string</code></td>
    <td>Dialog title</td>
  </tr>
  <tr>
    <td><code>confirmOk?: string</code></td>
    <td>Ok button text</td>
  </tr>
  <tr>
    <td><code>confirmCancel?: string</code></td>
    <td>Cancel button text</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2"><code>setDefaults: void</code></th>
  </tr>
  <tr>
    <td colspan="2">Set default values</td>
  </tr>
  <tr>
    <th colspan="2">Параметры</th>
  </tr>
  <tr>
    <td><code>title: string</code></td>
    <td>Dialog title</td>
  </tr>
  <tr>
    <td><code>ok: string</code></td>
    <td>Ok button text</td>
  </tr>
  <tr>
    <td><code>cancel: string</code></td>
    <td>Cancel button text</td>
  </tr>
</table>

## Usage

First, import the MaterialConfirmModule to your module:

```typescript
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialConfirmModule, MaterialConfirmConfig} from '@kovalenko/material-confirm';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppComponent} from './app';

const materialConfirmConfig: MaterialConfirmConfig = {
  ok: 'Ok',
  cancel: 'Cancel',
  position: {
    top: '10px'
  },
  width: '400px'
};

@NgModule({
  imports: [
    BrowserModule,
    MaterialConfirmModule.config(materialConfirmConfig)
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
```

Confirmation via directive

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <button (confirm)="callback()" [confirmMessage]="message">Click</button>
  `,
})
export class AppComponent {
  message = 'Confirm action';
  
  callback() {
    console.log('confirmed');
  }
}
```

Confirmation via service

```typescript
import {Component} from '@angular/core';
import {ConfirmService} from '@kovalenko/material-confirm';

@Component({
  selector: 'app',
  template: `
    <button (click)="action()">Click</button>
  `,
})
export class AppComponent {

  constructor(private confirmService: ConfirmService) { }
  
  async action() {
    if (await this.confirmService.confirm('Confirm action')) {
      console.log('confirmed');
    }
  }

}
```

## License

MIT
