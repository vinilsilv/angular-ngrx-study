import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { TodoComponent } from './components/todo/todo.component';

const routes: Routes = [
  { path:'', pathMatch: 'full', redirectTo: 'todos' },
  { path: 'user-details', component: UserDetailsComponent },
  { path: 'todos', component: TodoComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes), CommonModule],
    exports: [RouterModule]
})

export class AppRoutingModule { }
