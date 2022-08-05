import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CursosService } from 'src/app/cursos.service';
import { Curso } from '../curso';

@Injectable({
  providedIn: 'root',
})
export class CursoResolverGuard implements Resolve<Curso> {
  constructor(private cursosService: CursosService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Curso | Observable<Curso> | any {
    if (route.params && route.params['id']) {
      return this.cursosService.loadById(route.params['id']);
    }

    return of({
      id: null,
      nome: null,
    });
  }
}
