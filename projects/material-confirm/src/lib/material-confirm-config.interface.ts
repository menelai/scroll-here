import { MatDialogConfig } from "@angular/material/dialog";

export interface MaterialConfirmConfig extends MatDialogConfig {
  title?: string;
  ok?: string;
  cancel?: string;
}
