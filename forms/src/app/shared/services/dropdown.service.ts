import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Cidade } from '../models/cidade';
import { EstadoBr } from '../models/estado-br';

@Injectable({
  providedIn: 'root',
})
export class DropdownService {
  constructor(private http: HttpClient) {}

  getEstadosBr() {
    return this.http
      .get<EstadoBr[]>('assets/dados/estadosbr.json')
  }

  getCidades(idEstado: number) {
    return this.http
    .get<Cidade[]>('assets/dados/cidades.json')
    .pipe(
      map((cidades: Cidade[]) => cidades.filter((cidade: Cidade) => cidade.estado === idEstado))
    )
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

  getNewsletter(){
    return [
      { valor: true, desc: 'Sim' },
      { valor: false, desc: 'Nao' }
    ]
  }
}
