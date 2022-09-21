import { Action } from '@ngrx/store';

export function simpleReducer(state: string = 'Hello World', action: Action) {
    console.log(action.type, state)

    switch (action.type) {
        case 'PORTUGUESE':
            return state = 'Olá Mundo';

        case 'SPANISH':
            return state = 'Hola Mundo';

        default:
            return state;
    }
}