import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursosService } from 'src/app/cursos.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';

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
    private location: Location
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ],
      ],
    });
  }

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
          this.alertModalService.showAlertDanger('Erro ao criar um novo curso, tente novamente.')
        },
      });
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
  }
}
