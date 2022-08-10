import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CrudService } from '../crud-service';
import { Curso } from './curso';

@Injectable({
  providedIn: 'root'
})
export class Cursos2Service extends CrudService<Curso> {

  constructor(protected override http: HttpClient) {
    super(http, `${environment.API_URL}/cursos`)
  }
}
