import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { IFromCanDeactivate } from './form-candeactivate';

@Injectable()
export class AlunosDeactivate implements CanDeactivate<IFromCanDeactivate> {
  canDeactivate(
    component: IFromCanDeactivate
  ): Observable<boolean> | Promise<boolean> | boolean {
    // return component.podeMudarRota()

    return component.podeDesativar();
  }
}
