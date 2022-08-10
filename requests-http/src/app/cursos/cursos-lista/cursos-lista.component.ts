import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {
  catchError,
  EMPTY,
  Observable,
  of,
  Subject,
  switchMap,
  take,
} from 'rxjs';
import { CursosService } from 'src/app/cursos.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Curso } from '../curso';
import { Cursos2Service } from '../cursos2.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true,
})
export class CursosListaComponent implements OnInit {
  // cursos!: Curso[];

  // bsModalRef?: BsModalRef;

  deleteModalRef!: BsModalRef;
  @ViewChild('deleteModal') deleteModal: any;

  cursos$!: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  cursoSelecionado!: Curso;

  constructor(
    private cursosService: Cursos2Service,
    private modalService: BsModalService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute
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

  onDelete(curso: Curso) {
    this.cursoSelecionado = curso;
    // this.deleteModalRef = this.modalService.show(this.deleteModal, {
    //   class: 'modal-sm',
    // });

    const result$ = this.alertService.showConfirm(
      'Confirmação',
      'Tem certeza que deseja remover esse curso?'
    );
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap((result) =>
          result ? this.cursosService.remove(curso.id) : EMPTY
        )
      )
      .subscribe({
        next: () => {
          this.onRefresh();
        },
        error: () =>
          this.alertService.showAlertDanger(
            'Erro ao remover curso. Tente novamente mais tarde'
          ),
      });
  }

  onConfirmDelete() {
    this.cursosService.remove(this.cursoSelecionado.id).subscribe({
      next: () => {
        this.onRefresh();
      },
      error: () =>
        this.alertService.showAlertDanger(
          'Erro ao remover curso. Tente novamente mais tarde'
        ),
    });

    this.deleteModalRef.hide();
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }
}
