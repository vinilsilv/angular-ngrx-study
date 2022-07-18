import { createReducer, createAction, on, props } from '@ngrx/store';
import { ITodo } from '../components/todo/todo.component';

export interface IAppState {
  counter: number;
  todos: ITodo[];
}

export const appInitialState: IAppState = {
  counter: 2,
  todos: []
};

export const incrementaContador = createAction('[App] Aumenta contador');
export const decrementaContador = createAction('[App] Reduz contador');
export const defineContador = createAction('[App] Define contador', props<{ payload: number }>());

export const setTodos = createAction('[App] Set todos', props<{ payload: ITodo[] }>());

export const appReducer = createReducer(
  appInitialState,
  on(incrementaContador, (state) => {
    state = {
      ...state,
      counter: state.counter + 1,
    };
    return state;
  }),
  on(decrementaContador, (state) => {
    state = {
      ...state,
      counter: state.counter - 1,
    };
    return state;
  }),
  on(defineContador, (state, { payload } ) => {
    state = {
      ...state,
      counter: payload,
    };
    return state;
  }),
  on(setTodos, (state, {payload}) => {
    state = {
      ...state,
      todos: payload,
    };
    return state;
  })
);
