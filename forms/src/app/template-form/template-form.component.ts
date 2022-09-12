import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss'],
})
export class TemplateFormComponent implements OnInit {
  usuario: any = {
    nome: 'Nome',
    email: 'email@email.com',
  };

  constructor(
    private http: HttpClient,
    private cepService: ConsultaCepService
  ) {}

  ngOnInit(): void {}

  onSubmit(form: any) {
    console.log(form.form);

    this.http
      .post('https://httpbin.org/post', JSON.stringify(form.value))
      .subscribe({
        next: (res) => {
          console.log('Success', res);
          form.form.reset();
        },
        error: (res) => console.log('Failure', res),
      });
  }

  verificaValidTouched(campo: any) {
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo: any) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo),
    };
  }

  consultaCEP(cep: any, form: any) {
    cep = cep.replace(/\D/g, '');

    if (cep != '' || cep != null) {
      this.cepService.consultaCEP(cep)?.subscribe({
        next: (dados) => {
          this.populaDadosForm(dados, form);
        },
      });
    }
  }

  populaDadosForm(dados: any, form: any) {
    form.patchValue({
      endereco: {
        rua: dados.logradouro,
        cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
      },
    });
  }
}
