export interface MainMenuItem {
  name: string;
  routerLink?: string[];
  expanded?: boolean;
  access?: string | boolean;
  children?: MainMenuItem[];
}
