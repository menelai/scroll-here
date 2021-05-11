import {Directive, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[ngcPrintElement]'
})
export class PrintElementDirective {
  @Input('ngcPrintElement') element!: HTMLElement;
  constructor() { }

  @HostListener('click', ['$event']) onClick($event: MouseEvent) {
    const printDiv = document.createElement('div');
    printDiv.className = 'printable';
    printDiv.innerHTML = this.element.innerHTML;
    document.body.appendChild(printDiv);
    document.body.classList.add('printing');

    const srcCanvas = this.element.getElementsByTagName('canvas');
    const dstCanvas = printDiv.getElementsByTagName('canvas');

    for (let i = 0; i < srcCanvas.length; ++i) {
      dstCanvas?.item(i)?.getContext('2d')?.drawImage(srcCanvas.item(i) as any, 0, 0);
    }

    window.print();

    document.body.classList.remove('printing');
    document.body.removeChild(printDiv);
  }

}
