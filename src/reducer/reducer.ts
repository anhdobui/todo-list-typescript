import { Todo } from '../@types/todo.type';
import ActionType from '../actions/actions';

export const initialState: Todo[] = [];
const reducer = (state: Todo[], action: ActionType) => {
    switch (action.type) {
        case 'get_local':
            return action.payload;
        case 'add_todo':
            return [...state, action.payload];
        case 'edit_and_change_done':
            return action.payload(state);
        default:
            throw Error('Invalid Action');
    }
};
export default reducer;
