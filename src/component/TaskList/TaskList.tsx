import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Todo } from './../../@types/todo.type';
import { TodoTypes } from '../../PropTypes/todo.proptypes';
import styles from './taskList.module.scss';
const cx = classNames.bind(styles);
interface TaskListProps {
    title?: string;
    isDone?: boolean;
    todos: Todo[];
    handleDoneTodos: (id: string, done: boolean) => void;
    startEditTodo: (id: string) => void;
    deleteTodo: (id: string) => void;
}
function TaskList({ title, isDone, todos, handleDoneTodos, startEditTodo, deleteTodo }: TaskListProps) {
    return (
        <div className={cx('taskList')}>
            <div className={cx('container')}>
                <h1 className={cx('title')}>{title}</h1>
                {todos.map((todo) => (
                    <div className={cx('taskRow')} key={todo.id}>
                        <input
                            type="checkbox"
                            checked={todo.done}
                            onChange={(e) => handleDoneTodos(todo.id, e.target.checked)}
                        />
                        <span
                            className={cx('taskName', {
                                taskNameDone: isDone,
                            })}
                        >
                            {todo.name}
                        </span>
                        <div className={cx('taskActions')}>
                            <button className={cx('btn', 'btnUpdate')} onClick={(e) => startEditTodo(todo.id)}>
                                🖋️
                            </button>
                            <button className={cx('btn', 'btnRemove')} onClick={(e) => deleteTodo(todo.id)}>
                                🗑️
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TaskList;
TaskList.propTypes = {
    title: PropTypes.string.isRequired,
    isDone: PropTypes.bool,
    todos: PropTypes.arrayOf(TodoTypes),
    handleDoneTodos: PropTypes.func.isRequired,
    startEditTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
};
