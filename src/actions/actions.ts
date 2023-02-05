import { Todo } from '../@types/todo.type';
type ActionType =
    | { type: 'add_todo'; payload: Todo }
    | { type: 'get_local'; payload: Todo[] }
    | { type: 'edit_and_change_done'; payload: (todos: Todo[]) => Todo[] };
export default ActionType;
