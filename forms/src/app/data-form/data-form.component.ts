import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  distinctUntilChanged,
  empty,
  EMPTY,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { EMPTY_OBSERVER } from 'rxjs/internal/Subscriber';
import { BaseFormComponent } from '../shared/base-form/base-form.component';
import { FormValidations } from '../shared/form-validations';
import { Cidade } from '../shared/models/cidade';
import { EstadoBr } from '../shared/models/estado-br';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { DropdownService } from '../shared/services/dropdown.service';
import { VerificaEmailService } from './services/verifica-email.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss'],
})
export class DataFormComponent extends BaseFormComponent implements OnInit {
  // formulario!: FormGroup;
  estados!: EstadoBr[];
  cidades!: Cidade[]
  cargos: any[] = [];
  tecnologias: any[] = [];
  newsletterOp: any[] = [];

  frameworks: string[] = ['Angular', 'React', 'Vue', 'Sencha'];

  get FrameworksControls() {
    return this.formulario.get('frameworks') as FormArray;
  }

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropDownService: DropdownService,
    private cepService: ConsultaCepService,
    private verificaEmailService: VerificaEmailService
  ) {
    super();
  }

  override ngOnInit(): void {
    // this.verificaEmailService.verificarEmail('email2@email.com').subscribe()

    // this.estados = this.dropDownService.getEstadosBr();

    this.dropDownService.getEstadosBr().subscribe(
      dados => this.estados = dados
    )

    this.cargos = this.dropDownService.getCargos();

    this.tecnologias = this.dropDownService.getTecnologias();

    this.newsletterOp = this.dropDownService.getNewsletter();

    // this.formulario = new FormGroup({
    //   nome: new FormControl('V'),
    //   email: new FormControl(null),
    // })

    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3)]],
      email: [
        null,
        [Validators.required, Validators.email],
        [this.validarEmail.bind(this)],
      ],
      confirmarEmail: [null, [FormValidations.equalsTo('email')]],
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, FormValidations.cepValidator]],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
      }),
      cargo: [null],
      tecnologias: [null],
      newsletter: [true],
      termos: [null, Validators.pattern('true')],
      frameworks: this.buildFrameworks(),
    });

    this.formulario
      .get('endereco.cep')
      ?.statusChanges.pipe(
        distinctUntilChanged(),
        tap((value) => console.log(value)),
        switchMap((status) =>
          status === 'VALID'
            ? this.cepService.consultaCEP(
                this.formulario.get('endereco.cep')!.value
              )
            : EMPTY
        )
      )
      .subscribe({
        next: (dados) => (dados ? this.populaDadosForm(dados) : {}),
      });

      this.formulario.get('endereco.estado')?.valueChanges
      .pipe(
        tap(estado => console.log('novo estado', estado)),
        map(estado => this.estados.filter(e => e.sigla === estado)),
        map((estados: any) => {if(estados && estados.length > 0) { return estados[0].id}} ),
        switchMap((estadoId: number) => this.dropDownService.getCidades(estadoId)),
        tap(console.log)
      )  
      .subscribe(cidades => this.cidades = cidades)
      // this.dropDownService.getCidades(8).subscribe(console.log)
  }

  buildFrameworks(): any {
    const values = this.frameworks.map(() => new FormControl(false));
    return this.formBuilder.array(
      values,
      FormValidations.requiredMinCheckbox()
    );
  }

  submit() {
    let valueSubmit = Object.assign({}, this.formulario.value);

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
        .map((v: boolean, i: any) => (v ? this.frameworks[i] : null))
        .filter((v: string) => v !== null),
    });

    console.log(valueSubmit);

    this.http
      .post('https://httpbin.org/post', JSON.stringify(valueSubmit))
      .subscribe({
        next: (res) => {
          this.resetar();
        },
        error: (res) => console.log('Failure', res),
      });
  }

  consultaCEP() {
    const cep = this.formulario.get('endereco.cep')!.value.replace(/\D/g, '');

    if (cep != '' || cep != null) {
      this.cepService.consultaCEP(cep)?.subscribe({
        next: (dados) => {
          this.populaDadosForm(dados);
        },
      });
    }
  }

  populaDadosForm(dados: any) {
    this.formulario.patchValue({
      endereco: {
        rua: dados.logradouro,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
      },
    });
  }

  setarCargo() {
    const cargo = { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl' };
    this.formulario.get('cargo')?.setValue(cargo);
  }

  compararCargos(obj1: any, obj2: any) {
    return obj1 && obj2
      ? obj1.nome === obj2.nome && obj1.nivel === obj2.nivel
      : obj1 === obj2;
  }

  setarTecnologias() {
    this.formulario.get('tecnologias')?.setValue(['Java', 'JavaScript']);
  }

  validarEmail(formControl: FormControl) {
    return this.verificaEmailService
      .verificarEmail(formControl.value)
      .pipe(
        map((emailExiste) => (emailExiste ? { emailInvalido: true } : null))
      );
  }
}
