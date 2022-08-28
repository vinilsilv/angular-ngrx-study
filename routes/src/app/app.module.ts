import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterializeModule } from 'angular2-materialize';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './login/auth.service';
import { AuthGuard } from './guards/auth.guard';
// import { CursosModule } from './cursos/cursos.module';
// import { AlunosComponent } from './alunos/alunos.component';
// import { AlunosModule } from './alunos/alunos.module';
// import { routing } from './app.routing';
// import { CursosService } from './cursos/cursos.service';
// import { CursosComponent } from './cursos/cursos.component';
// import { CursoDetalheComponent } from './cursos/curso-detalhe/curso-detalhe.component';
// import { CursoNaoEncontradoComponent } from './cursos/curso-nao-encontrado/curso-nao-encontrado.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    // CursosComponent,
    // CursoDetalheComponent,
    // CursoNaoEncontradoComponent
  ],
  imports: [
    BrowserModule,
    MaterializeModule,
    // CursosModule,
    // AlunosModule,
    AppRoutingModule,
    // routing,
    FormsModule,
  ],
  // providers: [CursosService],
  bootstrap: [AppComponent],
  providers: [AuthService, AuthGuard],
})
export class AppModule {}
