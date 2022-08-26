import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
// import { CursoDetalheComponent } from "./cursos/curso-detalhe/curso-detalhe.component";
// import { CursoNaoEncontradoComponent } from "./cursos/curso-nao-encontrado/curso-nao-encontrado.component";
// import { CursosComponent } from "./cursos/cursos.component";

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    // { path: 'cursos', component: CursosComponent },
    // { path: 'curso/:id', component: CursoDetalheComponent },
    // { path: 'nao-encontrado', component: CursoNaoEncontradoComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
