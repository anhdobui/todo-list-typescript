import { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Todo } from './../../@types/todo.type';
import { TodoTypes } from './../../PropTypes/todo.proptypes';
import styles from './taskInput.module.scss';
const cx = classNames.bind(styles);
interface TaskInputProps {
    label: string;
    currentTodo: Todo | null;
    addTodos: (name: string) => void;
    editTodo: (name: string) => void;
    finishEditTodo: () => void;
}
function TaskInput({ addTodos, currentTodo, editTodo, finishEditTodo, label }: TaskInputProps) {
    const [name, setName] = useState<string>('');
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (currentTodo) {
            finishEditTodo();
            if (name) setName('');
        } else {
            addTodos(name);
            setName('');
        }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (currentTodo) {
            editTodo(e.target.value);
        } else {
            setName(e.target.value);
        }
    };

    return (
        <div className={cx('taskInput')}>
            <div className={cx('container')}>
                <h1 className={cx('title')}>{label}</h1>
                <form className={cx('form')} onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className={cx('inputSearch')}
                        onChange={handleChange}
                        value={currentTodo ? currentTodo.name : name}
                    />
                    <button className={cx('submit')}>{currentTodo ? '✔️' : '➕'}</button>
                </form>
            </div>
        </div>
    );
}

export default TaskInput;
TaskInput.propTypes = {
    label: PropTypes.string,
    addTodos: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired,
    finishEditTodo: PropTypes.func.isRequired,
    currentTodo: PropTypes.oneOfType([TodoTypes, PropTypes.oneOf([null])]),
};
