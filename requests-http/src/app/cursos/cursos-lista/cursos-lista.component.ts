import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { catchError, EMPTY, Observable, of, Subject } from 'rxjs';
import { CursosService } from 'src/app/cursos.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { Curso } from '../curso';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true,
})
export class CursosListaComponent implements OnInit {
  // cursos!: Curso[];

  // bsModalRef?: BsModalRef;

  cursos$!: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  constructor(
    private cursosService: CursosService,
    // private modalService: BsModalService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // this.cursosService.list().subscribe({
    //   next: (res) => {(this.cursos = res), console.log(this.cursos);},
    // });

    this.onRefresh();

    
  }

  onRefresh() {
    this.cursos$ = this.cursosService.list().pipe(
      catchError((err) => {
        this.error$.next(true);
        this.handleError();
        return EMPTY;
      })
    );

    // this.cursosService
    //   .list()
    //   .pipe(catchError(() => EMPTY))
    //   .subscribe({
    //     next: (dados) => console.log(dados),
    //     error: () => console.log('err')
    //   });
  }

  handleError() {
    this.alertService.showAlertDanger('Erro ao carregar cursos.');
    //   this.bsModalRef = this.modalService.show(AlertModalComponent);
    //   this.bsModalRef.content.type = 'danger';
    //   this.bsModalRef.content.message = 'Erro ao carregar cursos.';
  }

  onEdit(id: number) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }
}
