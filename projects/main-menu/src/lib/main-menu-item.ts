export interface MainMenuItem<T = any> {
  name: string;
  href?: string;
  target?: string;
  routerLink?: string[];
  expanded?: boolean;
  access?: T;
  children?: MainMenuItem[];
}
