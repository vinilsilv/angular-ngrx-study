import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlunosComponent } from "./alunos.component";
import { AlunoFormularioComponent } from './aluno-formulario/aluno-formulario.component';
import { AlunoDetalheComponent } from './aluno-detalhe/aluno-detalhe.component';
import { AlunosRoutingModule } from "./alunos-routing.module";

@NgModule({
    imports: [
        CommonModule,
        AlunosRoutingModule
    ],
    exports: [],
    declarations: [
        AlunosComponent,
        AlunoFormularioComponent,
        AlunoDetalheComponent
    ],
    providers: [],
})
export class AlunosModule {}