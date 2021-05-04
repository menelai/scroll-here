import {Inject, Injectable} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmComponent} from './confirm.component';
import {BootstrapConfirmConfig} from '../bootstrap-confirm-config.interface';
import {config as c} from '../confirm.config';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  constructor(
    @Inject(c) private config: BootstrapConfirmConfig,
    private modalService: NgbModal
  ) { }

  setDefaults(title: string, ok: string, cancel: string): void {
    this.config ??= {};
    this.config.ok = ok;
    this.config.cancel = cancel;
  }

  confirm(msg: string, ok: string = this.config?.ok || 'Ok', cancel: string = this.config?.cancel || 'Cancel'): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      const modalRef = this.modalService.open(ConfirmComponent, {ariaLabelledBy: 'modal-basic-title'});
      modalRef.result.then(() => resolve(true), () => resolve(false));
      modalRef.componentInstance.ok = ok;
      modalRef.componentInstance.cancel = cancel;
      modalRef.componentInstance.message = msg;
    });
  }
}
