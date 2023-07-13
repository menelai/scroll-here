export interface MainMenuItem<T = any> {
  name: string;
  href?: string;
  target?: string;
  routerLink?: string[];
  queryParams?: Record<string, any>;
  expanded?: boolean;
  access?: T;
  children?: MainMenuItem[];
}
