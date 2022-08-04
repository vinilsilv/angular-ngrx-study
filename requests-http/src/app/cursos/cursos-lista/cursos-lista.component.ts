import { Component, OnInit } from '@angular/core';
import { catchError, EMPTY, empty, Observable, of, Subject } from 'rxjs';
import { CursosService } from 'src/app/cursos.service';
import { Curso } from '../curso';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true,
})
export class CursosListaComponent implements OnInit {
  // cursos!: Curso[];

  cursos$!: Observable<Curso[]>;
  error$ = new Subject<boolean>()

  constructor(private cursosService: CursosService) {}

  ngOnInit(): void {
    // this.cursosService.list().subscribe({
    //   next: (res) => {(this.cursos = res), console.log(this.cursos);},
    // });

    this.onRefresh()
    
  }

  onRefresh(){
    this.cursos$ = this.cursosService.list()
    .pipe(
      catchError(err => {
        console.log('erro1', err);
        this.error$.next(true)
        return EMPTY;
      })
    )

    this.cursosService.list()
    .pipe(
      catchError(() => EMPTY)
    )
    .subscribe({
      next: dados => console.log(dados),
      error: err => console.error('erro2', err)
    })
  }
}
