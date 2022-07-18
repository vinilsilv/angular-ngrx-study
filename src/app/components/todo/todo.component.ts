import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState, setTodos } from 'src/app/store/app.state';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  private url: string = 'https://jsonplaceholder.typicode.com/todos';
  todos: ITodo[] = [];

  constructor(
    private http: HttpClient,
    private store: Store<{app: IAppState}>    
    ) {}

  ngOnInit(): void {
    this.http.get<ITodo[]>(this.url).subscribe({
      next: (res) => {
        this.todos = res
        this.store.dispatch(setTodos({ payload: res}))
      },
    });
  }
}

export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
