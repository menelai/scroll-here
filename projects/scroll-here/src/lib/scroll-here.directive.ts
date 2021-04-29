import {Directive, ElementRef, EventEmitter, Inject, Input, Output} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {PageScrollInstance, PageScrollService} from 'ngx-page-scroll-core';

@Directive({
  selector: '[ngcScrollHere]'
})
export class ScrollHereDirective {

  @Input() set ngcScrollHere(v: boolean) {
    if (v) {
      const view = typeof this.ngcScrollContainer === 'string' ? document.querySelectorAll(this.ngcScrollContainer)[0] : this.ngcScrollContainer;
      this.ngcScrollTriggered.emit(true);
      const pageScrollInstance: PageScrollInstance = new PageScrollInstance({
          document: this.document,
          scrollTarget: this.element.nativeElement,
          scrollViews: [view],
          advancedInlineOffsetCalculation: true,
          duration: this.ngcScrollDuration,
          scrollFinishListener: this.ngcScrollFinished,
          easingLogic: (t: number, b: number, c: number, d: number): number => {
            if (t === 0) {
              return b;
            }
            if (t === d) {
              return b + c;
            }
            // tslint:disable-next-line:no-conditional-assignment
            if ((t /= d / 2) < 1) {
              return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            }
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
          }
        }
      );
      this.pageScrollService.start(pageScrollInstance);
    }
  }
  @Input() ngcScrollDuration = 200;
  @Input() ngcScrollContainer: string | HTMLElement = 'html';
  @Output() ngcScrollTriggered = new EventEmitter();
  @Output() ngcScrollFinished = new EventEmitter();

  constructor(
    private element: ElementRef,
    private pageScrollService: PageScrollService,
    @Inject(DOCUMENT) private document: any
  ) { }

}
