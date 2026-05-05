export interface MainMenuItem<T = any> {
  id: string;
  name: string;
  href?: string;
  target?: string;
  routerLink?: string[];
  queryParams?: Record<string, any>;
  access?: T;
  children?: MainMenuItem[];
}
