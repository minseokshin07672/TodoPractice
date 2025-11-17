import { TodoState } from '@/models/Todo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TODOS_KEY = 'todos';

export const TodoService = {
    async saveTodos(todos: TodoState): Promise<void> {
        await AsyncStorage.setItem(TODOS_KEY, JSON.stringify(todos));
    },

    async loadTodos(): Promise<TodoState | null> {
        const data = await AsyncStorage.getItem(TODOS_KEY);
        return data ? JSON.parse(data) : null;
    },

    async clearTodos(): Promise<void> {
        await AsyncStorage.removeItem(TODOS_KEY);
    }
};