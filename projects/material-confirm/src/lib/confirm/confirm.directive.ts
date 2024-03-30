import {Directive, HostListener, Input, Output, EventEmitter} from '@angular/core';
import {ConfirmService} from './confirm.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[confirm]'
})
export class ConfirmDirective {
  @Input() confirmTitle?: string;
  @Input() confirmMessage!: string;
  @Input() confirmOk?: string;
  @Input() confirmCancel?: string;
  @Output() confirm = new EventEmitter<any>();

  constructor(private confirmService: ConfirmService) { }

  @HostListener('click', ['$event'])
  async onClick(e: MouseEvent): Promise<void> {
    e.preventDefault();
    e.stopPropagation();

    const promise = this.confirmService.confirm(this.confirmMessage, this.confirmTitle, this.confirmOk, this.confirmCancel);
    if (await promise) {
      this.confirm.emit();
    }
  }

}
