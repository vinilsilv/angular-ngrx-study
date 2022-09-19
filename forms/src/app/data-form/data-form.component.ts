import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { map, Observable } from 'rxjs';
import { FormValidations } from '../shared/form-validations';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { DropdownService } from '../shared/services/dropdown.service';
import { VerificaEmailService } from './services/verifica-email.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss'],
})
export class DataFormComponent implements OnInit {
  formulario!: FormGroup;
  estados!: Observable<any>;
  cargos: any[] = [];
  tecnologias: any[] = [];
  newsletterOp: any[] = [];

  frameworks: string[] = ['Angular', 'React', 'Vue', 'Sencha']

  get FrameworksControls(){
    return this.formulario.get('frameworks') as FormArray
  }

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropDownService: DropdownService,
    private cepService: ConsultaCepService,
    private verificaEmailService: VerificaEmailService
  ) {}

  ngOnInit(): void {

    // this.verificaEmailService.verificarEmail('email2@email.com').subscribe()

    this.estados = this.dropDownService.getEstadosBr();

    this.cargos = this.dropDownService.getCargos();

    this.tecnologias = this.dropDownService.getTecnologias();

    this.newsletterOp = this.dropDownService.getNewsletter();

    // this.formulario = new FormGroup({
    //   nome: new FormControl('V'),
    //   email: new FormControl(null),
    // })

    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email], [this.validarEmail.bind(this)]],
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
      frameworks: this.buildFrameworks()
    });
  }
  
  buildFrameworks(): any {
    const values = this.frameworks.map(() => new FormControl(false));
    return this.formBuilder.array(values, FormValidations.requiredMinCheckbox())
  }

  onSubmit() {
    console.log(this.formulario)
    
    let valueSubmit = Object.assign({}, this.formulario.value);
    
    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
      .map((v: boolean, i:any) => v ? this.frameworks[i] : null)
      .filter((v: string) => v !== null)
    })
    console.log(valueSubmit)

    if (this.formulario.invalid) {
      this.verificaValidacoesForm(this.formulario);

      return;
    }

    this.http
      .post('https://httpbin.org/post', JSON.stringify(valueSubmit))
      .subscribe({
        next: (res) => {
          console.log('Success', res);
          this.resetar();
        },
        error: (res) => console.log('Failure', res),
      });
  }

  verificaValidacoesForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((campo) => {
      const controle = formGroup.get(campo);
      controle!.markAsDirty();

      if (controle instanceof FormGroup) {
        this.verificaValidacoesForm(controle);
      }
    });
  }

  resetar() {
    this.formulario.reset();
  }

  aplicaCssErro(campo: string) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo),
    };
  }

  verificaValidTouched(campo: string) {
    return (
      !this.formulario.get(campo)?.valid &&
      (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty)
    );
  }

  verificaEmailInvalido() {
    let campoEmail = this.formulario.get('email');
    if (campoEmail!.errors) {
      return campoEmail!.errors['email'] && campoEmail!.touched;
    }
  }

  verificaRequired(campo: string) {
    return (
      !this.formulario.get(campo)?.hasError('reuired') &&
      (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty)
    );
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
    return this.verificaEmailService.verificarEmail(formControl.value)
    .pipe(map((emailExiste) => emailExiste ? {emailInvalido: true} : null));
  }
}
