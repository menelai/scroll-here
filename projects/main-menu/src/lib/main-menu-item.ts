export interface MainMenuItem<T = any> {
  name: string;
  routerLink?: string[];
  expanded?: boolean;
  access?: T;
  children?: MainMenuItem[];
}
