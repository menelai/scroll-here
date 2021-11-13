import {Directive, ElementRef, HostBinding, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';

@Directive({
  selector: '[dragScroll]'
})
export class DragScrollDirective implements OnInit, OnDestroy {
  @HostBinding('[attr.style]') myStyle!: SafeStyle;
  @Input('dragScroll') _enabled!: boolean;
  private _pushed = false;
  private lastClientX!: number;
  private startClientX!: number;
  private lastClientY!: number;
  private startClientY!: number;

  constructor(
    private elRef: ElementRef,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.myStyle = this.sanitizer.bypassSecurityTrustStyle('cursor: grab');
  }

  ngOnDestroy(): void {
    window.removeEventListener('mousemove', this._mouseMove);
    window.removeEventListener('mouseup', this._mouseUp);
  }

  @HostListener('mousedown', ['$event']) onMouseDown(e: MouseEvent) {
    if (this._enabled) {
      window.addEventListener('mousemove', this._mouseMove);
      window.addEventListener('mouseup', this._mouseUp);

      this.lastClientX = this.startClientX = e.clientX;
      this.lastClientY = this.startClientY = e.clientY;

      this._pushed = true;

      this._clearSelection();

      e.preventDefault();
      e.stopPropagation();
    }
  }

  private _mouseMove = (event: MouseEvent) => {
    if (this._enabled) {
      if (this._pushed) {
        this.elRef.nativeElement.scrollLeft -= (-this.lastClientX + (this.lastClientX = event.clientX));
      }

      event.preventDefault();
    }
  }

  private _mouseUp = (e: MouseEvent) => {
    if (this._enabled) {
      this._pushed = false;
      window.removeEventListener('mousemove', this._mouseMove);
      window.removeEventListener('mouseup', this._mouseUp);
    }
  }

  private _clearSelection () {
    if (window.getSelection) {
      if (window.getSelection()?.empty) {
        window.getSelection()?.empty();
      } else if (window.getSelection()?.removeAllRanges) {
        window.getSelection()?.removeAllRanges();
      }
    } else {
      // @ts-ignore
      if (document['selection']) {
        // @ts-ignore
        document['selection'].empty();
      }
    }
  }

}
