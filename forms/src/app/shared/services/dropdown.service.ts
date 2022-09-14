import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DropdownService {
  constructor(private http: HttpClient) {}

  getEstadosBr() {
    return this.http
      .get('assets/dados/estadosbr.json')
  }

  getCargos(){
    return [
      { nome: "Dev", nivel: "Junior", desc: "Dev Jr" },
      { nome: "Dev", nivel: "Pleno", desc: "Dev Pl" },
      { nome: "Dev", nivel: "Senior", desc: "Dev Sr" }
    ]
  }

  getTecnologias(){
    return [
      { nome: 'Java', desc: 'Java' },
      { nome: 'JavaScript', desc: 'JavaScript' },
      { nome: 'PHP', desc: 'PHP' }
    ]
  }
}
