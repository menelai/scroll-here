import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export class BaseFilter {
  pageSize!: number;
  page = 0;
  updated$!: BehaviorSubject<BaseFilter>;
  query$!: Observable<BaseFilter>;

  get offset(): number {
    return this.page * this.pageSize;
  }

  constructor(pageSize = 20, queryParams?: Observable<any>) {
    Object.defineProperty(this, 'pageSize', {
      value: pageSize,
    });
    Object.defineProperty(this, 'updated$', {
      value: new BehaviorSubject(this),
    });
    Object.defineProperty(this, 'query$', {
      value: queryParams ? queryParams.pipe(
        map(params => {
          this.transformParams(params);
          return this;
        }),
      ) : this.updated$,
    });
  }

  changePage(pageIndex: number): void {
    this.page = pageIndex;
    this.updated();
  }

  updated(): void {
    this.updated$.next(this);
  }

  protected transformParams(params: any): void {
    this.page = Number(params.page) || 0;
  }
}
