import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import TaskInput from '../TaskInput';
import TaskList from '../TaskList';

import styles from './todoApp.module.scss';
import { Todo } from './../../@types/todo.type';

// interface HandleNewTodos {
//     (todos: Todo[]): Todo[];
// }
type HandleNewTodos = (todos: Todo[]) => Todo[];
const cx = classNames.bind(styles);
const syncReactToLocal = (handleNewTodos: HandleNewTodos) => {
    const todoString = localStorage.getItem('todos');
    const todoObj: Todo[] = JSON.parse(todoString || '[]');
    const newTodoObj = handleNewTodos(todoObj);
    localStorage.setItem('todos', JSON.stringify(newTodoObj));
};
function TodoApp() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
    const doneTodos = todos.filter((todo) => todo.done);
    const notDoneTodos = todos.filter((todo) => !todo.done);

    useEffect(() => {
        const todoString = localStorage.getItem('todos');
        const todoObj = JSON.parse(todoString || '[]');
        setTodos(todoObj);
    }, []);

    const addTodos = (name: string) => {
        if (name.trim()) {
            const todo: Todo = {
                name: name.trim(),
                done: false,
                id: new Date().toISOString(),
            };
            setTodos((prev) => [...prev, todo]);
            syncReactToLocal((todoObj: Todo[]) => [...todoObj, todo]);
        }
    };
    const handleDoneTodos = (id: string, done: boolean) => {
        const handler = (todos: Todo[]) => {
            return todos.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, done };
                }
                return todo;
            });
        };
        setTodos((prev) => handler(prev));
        syncReactToLocal(handler);
    };

    const startEditTodo = (id: string) => {
        const findedTodo = todos.find((todo) => todo.id === id);
        if (findedTodo) {
            setCurrentTodo(findedTodo);
        }
    };
    const editTodo = (name: string) => {
        setCurrentTodo((prev) => {
            if (prev) {
                return { ...prev, name };
            }
            return null;
        });
    };
    const finishEditTodo = () => {
        if (currentTodo) {
            const handler = (todos: Todo[]) => {
                return todos.map((todo) => {
                    if (todo.id === (currentTodo as Todo).id) {
                        return { ...(currentTodo as Todo), name: (currentTodo as Todo).name.trim() };
                    }
                    return todo;
                });
            };

            if ((currentTodo as Todo).name.trim()) {
                setTodos((prev) => handler(prev));
                syncReactToLocal(handler);
            } else {
                deleteTodo((currentTodo as Todo).id);
            }
        }
        setCurrentTodo(null);
    };
    const deleteTodo = (id: string) => {
        if (currentTodo) {
            setCurrentTodo(null);
        }
        setTodos((prev) => {
            return prev.filter((todo) => todo.id !== id);
        });
        syncReactToLocal((todos) => todos.filter((todo) => todo.id !== id));
    };
    return (
        <div className={cx('todoApp')}>
            <div className={cx('container')}>
                <TaskInput
                    label="Todo list typescript"
                    addTodos={addTodos}
                    currentTodo={currentTodo}
                    editTodo={editTodo}
                    finishEditTodo={finishEditTodo}
                />
                <TaskList
                    title="Chưa hoàn thành"
                    todos={notDoneTodos}
                    handleDoneTodos={handleDoneTodos}
                    startEditTodo={startEditTodo}
                    deleteTodo={deleteTodo}
                />
                <TaskList
                    title="Hoàn thành"
                    isDone
                    todos={doneTodos}
                    handleDoneTodos={handleDoneTodos}
                    startEditTodo={startEditTodo}
                    deleteTodo={deleteTodo}
                />
            </div>
        </div>
    );
}

export default TodoApp;
