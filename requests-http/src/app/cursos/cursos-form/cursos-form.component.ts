import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { CursosService } from 'src/app/cursos.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Curso } from '../curso';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss'],
})
export class CursosFormComponent implements OnInit {
  form!: FormGroup;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private cursosService: CursosService,
    private alertModalService: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.route.params.subscribe({
    //   next: (params: any) => {
    //     const id = params['id'];
    //     const curso$ = this.cursosService.loadById(id);
    //     curso$.subscribe({
    //       next: (curso) => {
    //         this.updateForm(curso);
    //       },
    //     });
    //   },
    // });

    // this.route.params
    //   .pipe(
    //     map((params: any) => params['id']),
    //     switchMap((id: any) => this.cursosService.loadById(id))
    //   )
    //   .subscribe({
    //     next: curso => this.updateForm(curso)
    //   });

    const curso = this.route.snapshot.data['curso'];

    this.form = this.fb.group({
      id: [curso.id],
      nome: [
        curso.nome,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ],
      ],
    });
  }

  // updateForm(curso: Curso) {
  //   this.form.patchValue({
  //     id: curso.id,
  //     nome: curso.nome,
  //   });
  // }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.cursosService.create(this.form.value).subscribe({
        next: () => {
          this.submitted = false;
          this.alertModalService.showAlertSuccess('Enviado com sucesso');
          this.location.back();
        },
        error: () => {
          this.submitted = false;
          this.alertModalService.showAlertDanger(
            'Erro ao criar um novo curso, tente novamente.'
          );
        },
      });
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
  }
}
