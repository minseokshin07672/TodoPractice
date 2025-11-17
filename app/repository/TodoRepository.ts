import { TodoService } from '../service/TodoService';
import { TodoState, Todo } from '../models/Todo';

export const TodoRepository = {
    async getAllTodos(): Promise<TodoState> {
        const todos = await TodoService.loadTodos();
        return todos || {};
    },

    async saveTodos(todos: TodoState): Promise<void> {
        await TodoService.saveTodos(todos);
    },

    async toggleTodoStatus(
        todos: TodoState,
        date: string,
        index: number
    ): Promise<TodoState> {
        if (!todos[date]) {
            return todos;
        }

        const updated: TodoState = {
            ...todos,
            [date]: todos[date].map((todo, i) =>
                i === index
                    ? { ...todo, status: todo.status === 'todo' ? 'done' : 'todo' }
                    : todo
            )
        };
        await this.saveTodos(updated);
        return updated;
    }
};