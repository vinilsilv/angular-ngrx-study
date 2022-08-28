import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  CanDeactivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AlunoFormularioComponent } from '../alunos/aluno-formulario/aluno-formulario.component';
import { IFromCanDeactivate } from './form-candeactivate';

@Injectable()
export class AlunosDeactivate
  implements CanDeactivate<IFromCanDeactivate>
{
  canDeactivate(
    component: IFromCanDeactivate
  ): Observable<boolean> | Promise<boolean> | boolean {

    // return component.podeMudarRota()

    return component.podeDesativar()
  }
}
