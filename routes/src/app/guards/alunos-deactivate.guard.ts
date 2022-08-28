import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  CanDeactivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AlunoFormularioComponent } from '../alunos/aluno-formulario/aluno-formulario.component';

@Injectable()
export class AlunosDeactivate
  implements CanDeactivate<AlunoFormularioComponent>
{
  canDeactivate(
    component: AlunoFormularioComponent
  ): Observable<boolean> | Promise<boolean> | boolean {

    return component.podeMudarRota()
  }
}
