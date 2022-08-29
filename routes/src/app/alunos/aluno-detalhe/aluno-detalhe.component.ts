import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlunosGuard } from 'src/app/guards/alunos.guard';
import { Aluno } from '../aluno';
import { AlunosService } from '../alunos.service';

@Component({
  selector: 'app-aluno-detalhe',
  templateUrl: './aluno-detalhe.component.html',
  styleUrls: ['./aluno-detalhe.component.scss'],
})
export class AlunoDetalheComponent implements OnInit, OnDestroy {
  aluno: any;
  inscricao!: Subscription;
  canEdit?: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alunosService: AlunosService,
    private alunosGuard: AlunosGuard
  ) {}

  ngOnInit(): void {
    // this.inscricao = this.route.params.subscribe((params) => {
    //   let id = params['id'];

    //   this.aluno = this.alunosService.getAluno(id);
    // });

    this.inscricao = this.route.data.subscribe({
      next: (info: any) => {
        this.aluno = info.aluno;
        return true;
      }
    });
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

  editarContato() {
    this.router.navigate(['/alunos', this.aluno.id, 'editar']);
  }
}
