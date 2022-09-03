import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onSubmit(form: any) {
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

    if (cep != '') {
      let validaCep = /^[0-9]{8}$/;

      if (validaCep.test(cep)) {
        this.http
          .get(`https://viacep.com.br/ws/${cep}/json/`)
          .subscribe({ next: (dados) => this.populaDadosForm(dados, form) });
      }
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
        estado: dados.uf
      }
    })
  }
}
