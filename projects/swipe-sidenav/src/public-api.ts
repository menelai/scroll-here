import {Directive, DoCheck, ElementRef, ViewChild} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';

interface SwipeInfo {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  scrolling: boolean | null;
  manual: boolean;
}

@Directive()
// tslint:disable-next-line:directive-class-suffix
export class SwipeableSidenav implements DoCheck {
  @ViewChild('drawer', {static: false}) sideNav?: MatDrawer;
  @ViewChild('drawer', {static: false, read: ElementRef}) sideNavElementRef?: ElementRef;

  disableAnimation = false;

  private isIosDevice =
    typeof window !== 'undefined' &&
    window.navigator &&
    window.navigator.platform &&
    (/iP(ad|hone|od)/.test(window.navigator.platform) ||
      (window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1));

  private readonly swipeInfo: SwipeInfo = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    scrolling: null,
    manual: false
  };

  private backdropEl?: HTMLElement;
  private drawerEl?: HTMLElement;
  private touchStartHandler = this.bodyTouchStart.bind(this);
  private touchMoveHandler = this.bodyTouchMove.bind(this);
  private touchEndHandler = this.bodyTouchEnd.bind(this);
  private transitionEndHandler = this.resetDrawer.bind(this);

  constructor() { }

  ngDoCheck(): void {
    if (!this.drawerEl && this.sideNavElementRef) {
      this.backdropEl = document.querySelector('.mat-drawer-backdrop') as HTMLElement;
      this.drawerEl = this.sideNavElementRef.nativeElement;
      window.document.body.addEventListener('touchstart', this.touchStartHandler);
      window.document.body.addEventListener('touchmove', this.touchMoveHandler, { passive: !this.isIosDevice });
      window.document.body.addEventListener('touchend', this.touchEndHandler);
    } else if (this.drawerEl && !this.sideNavElementRef) {
      console.log('destroy');
      window.document.body.removeEventListener('touchstart', this.touchStartHandler);
      window.document.body.removeEventListener('touchmove', this.touchMoveHandler);
      window.document.body.removeEventListener('touchend', this.touchEndHandler);
      this.drawerEl.removeEventListener('transitionend', this.transitionEndHandler);
      delete this.drawerEl;
    }
  }

  private bodyTouchStart(event: TouchEvent): void {
    const t = event.touches[0];
    this.swipeInfo.x1 = t.pageX;
    this.swipeInfo.y1 = t.pageY;
    this.swipeInfo.x2 = 0;
    this.swipeInfo.y2 = 0;
    this.swipeInfo.scrolling = null;
    this.swipeInfo.manual = false;
  }

  /**
   * Handles touch move events to detect if the user is attempting to scroll or swipe.
   * If the user moves the touch more than 5 px vertically then we assume the user is scrolling.
   * If the user moves the touch more than 5 px horizontally then we assume the user is swiping and disable scrolling.
   * Touch end cleans up the scroll disabling.
   */
  private bodyTouchMove(event: TouchEvent): void {
    if (this.swipeInfo.scrolling) {
      // if we're scrolling then ignore these events
      return;
    }

    const t = event.touches[0];
    this.swipeInfo.x2 = t.pageX;
    this.swipeInfo.y2 = t.pageY;

    // check if we have decided if the user is scrolling or not
    if (this.swipeInfo.scrolling === null) {
      if (Math.abs(this.swipeInfo.y2 - this.swipeInfo.y1) > 5) {
        // if the user has moved more than 5 pixels y then they're scrolling
        this.swipeInfo.scrolling = true;
        return;
      }

      if (Math.abs(this.swipeInfo.x2 - this.swipeInfo.x1) > 5) {
        // if the user has moved more than 5 pixels x then they're swiping
        this.swipeInfo.scrolling = false;
        // disable scrolling
        window.document.body.classList.add('lock-scroll');
        if (this.isIosDevice) {
          // css overflow:hidden doesn't work on the body for iOS so we have to use a non-passive listener and preventdefault to prevent scrolling
          event.preventDefault();
        }
      }
    }

    // the user is swiping
    // ignore swiping if the menu is not over
    if (this.sideNav?.mode !== 'over') {
      return;
    }

    // swipe left is -px, right is +px
    let offset = this.swipeInfo.x2 - this.swipeInfo.x1;
    let translate = 0;
    if (this.sideNav.opened) {
      // if nav is open then offset should be negative
      if (offset > 0) {
        return;
      }

      translate = offset;
    } else {
      // if nav is closed then offset should be positive
      if (offset < 0) {
        return;
      }
      // make sure the offset is not greater than sidenav width
      // to prevent the sidenav from floating off the left side
      // @ts-ignore
      offset = offset > this.sideNav._width ? this.sideNav._width : offset;

      // @ts-ignore
      translate = -this.sideNav._width + offset;

      this.drawerEl!.style.boxShadow = null as any;
    }

    this.drawerEl!.style.visibility = 'visible';
    // update translate3d of sidenav by offset so the drawer moves
    this.drawerEl!.style.transform = `translate3d(${translate}px, 0, 0)`;
    // update the opacity of the background so it fades in/out while the drawer moves
    this.backdropEl!.style.visibility = 'visible';
    // @ts-ignore
    this.backdropEl.style.backgroundColor = `rgba(0,0,0,${(0.6 * Math.abs(offset + (this.sideNav.opened ? this.sideNav._width : 0)) / this.sideNav._width)})`;

    // disable backdrop transition while we're dragging to prevent lag
    this.backdropEl!.style.transitionDuration = '0ms';
  }

  private bodyTouchEnd(event: TouchEvent): void {
    const t = event.changedTouches[0];
    this.swipeInfo.x2 = t.pageX;
    this.swipeInfo.y2 = t.pageY;

    // decide if we need to hide or show the sidenav
    if (this.swipeInfo.scrolling === false) {
      // enable scrolling again
      window.document.body.classList.remove('lock-scroll');
      // restore backdrop transition
      this.backdropEl!.style.transitionDuration = null as any;

      // if the menu is not over then ignore
      if (this.sideNav?.mode !== 'over') {
        return;
      }

      const offset = this.swipeInfo.x2 - this.swipeInfo.x1;
      // if the offset is < 0 and the sidenav is not open then ignore it
      // if the offset is > 0 and the sideNav is open then ignore it
      if ((offset < 0 && !this.sideNav.opened) || (offset > 0 && this.sideNav.opened)) {
        return;
      }

      // is the offset < 30% of width then ignore and reset position
      // @ts-ignore
      if (Math.abs(this.swipeInfo.x2 - this.swipeInfo.x1) < this.sideNav._width * 0.3) {
        this.backdropEl!.style.visibility = null as any;
        if (this.sideNav.opened) {
          // reset drawer position
          this.drawerEl!.style.transform = 'none';
          // reset background opacity
          this.backdropEl!.style.backgroundColor = 'rgba(0,0,0,0.6)';
        } else {
          // reset drawer position
          this.drawerEl!.style.transform = null as any;
          // reset background opacity
          this.backdropEl!.style.backgroundColor = null as any;
          this.drawerEl!.style.boxShadow = 'none';
        }
        return;
      }

      // manually close/open the drawer using css and then update the state of the sidenav
      // if we close/open the sidenav directly it restarts the animation at fully opened/closed causing jank
      // so we have to fake the animation and then update the sidenav so the state matches
      this.swipeInfo.manual = true;
      this.disableAnimation = true;

      // wait for the end of the transition so we can reset anything we hacked to make this work
      this.drawerEl!.addEventListener('transitionend', this.transitionEndHandler);
      // wait one frame for the handler to be established before setting the transition
      requestAnimationFrame(() => {
        this.drawerEl!.style.transition = '400ms cubic-bezier(0.25, 0.8, 0.25, 1)';
        if (this.sideNav?.opened) {
          // update translate3d of sidenav so that it animates closed
          this.drawerEl!.style.transform = `translate3d(-100%, 0, 0)`;
        } else {
          // update the transform on the sidenav so that it animates open
          this.drawerEl!.style.transform = `none`;
          // reset background opacity
          this.backdropEl!.style.backgroundColor = 'rgba(0,0,0,0.6)';
        }
      });
    }
  }

  private resetDrawer(): void {
    this.drawerEl!.removeEventListener('transitionend', this.transitionEndHandler);

    this.backdropEl!.style.visibility = null as any;
    if (this.sideNav?.opened) {
      // make the backdrop hide as if the sidenav is closed
      this.backdropEl!.classList.remove('mat-drawer-shown');
      // reset the backgroundColor override we set so it will work normally in the future
      this.backdropEl!.style.backgroundColor = null as any;
      // reset the transition and transform properties so the sidenav doesn't get confused when it closes
      this.drawerEl!.style.transition = null as any;
      this.drawerEl!.style.transform = 'none';

      // update the sidenav state to closed
      this.sideNav.toggle(false);
    } else {
      // make the backdrop show as if the sidenav is open
      this.backdropEl!.classList.add('mat-drawer-shown');
      // reset the backgroundColor override we set so it will work normally in the future
      this.backdropEl!.style.backgroundColor = null as any;
      // reset the transition and transform properties so the sidenav doesn't get confused when it closes
      this.drawerEl!.style.transition = null as any;

      this.sideNav!.toggle(true);
    }

    requestAnimationFrame(() => {
      this.swipeInfo.manual = false;
      this.disableAnimation = false;
    });
  }
}
