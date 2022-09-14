import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { EstadoBr } from '../shared/models/estado-br';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { DropdownService } from '../shared/services/dropdown.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss'],
})
export class DataFormComponent implements OnInit {
  formulario!: FormGroup;
  estados!: Observable<any>;
  cargos: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropDownService: DropdownService,
    private cepService: ConsultaCepService
  ) {}

  ngOnInit(): void {
    this.estados = this.dropDownService.getEstadosBr();

    this.cargos = this.dropDownService.getCargos()

    // this.formulario = new FormGroup({
    //   nome: new FormControl('V'),
    //   email: new FormControl(null),
    // })

    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
      }),
      cargo: [null],
    });
  }

  onSubmit() {
    if (this.formulario.invalid) {
      this.verificaValidacoesForm(this.formulario);

      return;
    }

    this.http
      .post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
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
    const cargo = { nome: "Dev", nivel: "Pleno", desc: "Dev Pl" };
    this.formulario.get('cargo')?.setValue(cargo);
  }

  compararCargos(obj1: any, obj2: any) {
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2 
  }
}
