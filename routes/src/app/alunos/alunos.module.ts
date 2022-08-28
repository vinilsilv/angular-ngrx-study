import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlunosComponent } from './alunos.component';
import { AlunoFormularioComponent } from './aluno-formulario/aluno-formulario.component';
import { AlunoDetalheComponent } from './aluno-detalhe/aluno-detalhe.component';
import { AlunosRoutingModule } from './alunos-routing.module';
import { AlunosService } from './alunos.service';
import { FormsModule } from '@angular/forms';
import { AlunosDeactivate } from '../guards/alunos-deactivate.guard';

@NgModule({
  imports: [CommonModule, FormsModule, AlunosRoutingModule],
  exports: [],
  declarations: [
    AlunosComponent,
    AlunoFormularioComponent,
    AlunoDetalheComponent,
  ],
  providers: [AlunosService, AlunosDeactivate],
})
export class AlunosModule {}
