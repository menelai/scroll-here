# FocusInvalidInput

On form submit focuses first invalid material input

## Installation

```
npm install @kovalenko/focus-invalid-input
```

## Usage

First, import the FocusInvalidInputModule to your module:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FocusInvalidInputModule } from '@kovalenko/focus-invalid-input';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app';

@NgModule({
  imports: [BrowserModule, FocusInvalidInputModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
```

Then put the directive inside the form tag:
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <form (ngSubmit)="save()" focusInvalidInput>
      <mat-form-field>
        <input type="text" matInput placeholder="Name" required [(ngModel)]="name" name="name">
      </mat-form-field>
    </form>
  `,
})
export class AppComponent {
  name: string;
  save() {
    // save
  }
}
```
