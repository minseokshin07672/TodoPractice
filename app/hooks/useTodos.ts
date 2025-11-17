import { useState, useEffect } from 'react';
import { TodoRepository } from '../repository/TodoRepository';
import { TodoState } from '../models/Todo';

export const useTodos = () => {
    const [todos, setTodos] = useState<TodoState>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTodos();
    }, []);

    const loadTodos = async () => {
        try {
            const data = await TodoRepository.getAllTodos();
            setTodos(data);
        } catch (error) {
            console.error('Failed to load todos:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleTodoStatus = async (date: string, index: number) => {
        try {
            const updated = await TodoRepository.toggleTodoStatus(todos, date, index);
            setTodos(updated);
        } catch (error) {
            console.error('Failed to toggle todo:', error);
        }
    };

    const addTodo = async (date: string, text: string) => {
        try {
            const newTodo = { text, status: 'todo' as const };
            const updated = {
                ...todos,
                [date]: [...(todos[date] || []), newTodo]
            };
            await TodoRepository.saveTodos(updated);
            setTodos(updated);
        } catch (error) {
            console.error('Failed to add todo:', error);
        }
    };

    const updateTodo = async (date: string, index: number, newText: string) => {
        try {
            if (!todos[date]) return;

            const updated = {
                ...todos,
                [date]: todos[date].map((todo, i) =>
                    i === index ? { ...todo, text: newText } : todo
                )
            };
            await TodoRepository.saveTodos(updated);
            setTodos(updated);
        } catch (error) {
            console.error('Failed to update todo:', error);
        }
    };

    const deleteTodo = async (date: string, index: number) => {
        try {
            if (!todos[date]) return;

            const updated = {
                ...todos,
                [date]: todos[date].filter((_, i) => i !== index)
            };

            if (updated[date].length === 0) {
                delete updated[date];
            }

            await TodoRepository.saveTodos(updated);
            setTodos(updated);
        } catch (error) {
            console.error('Failed to delete todo:', error);
        }
    };

    const getTodoDatesForMonth = (year: number, month: number): number[] => {
        const prefix = `${year}-${String(month).padStart(2, '0')}-`;
        const dates = Object.keys(todos)
            .filter(date => date.startsWith(prefix))
            .map(date => parseInt(date.split('-')[2], 10));
        return dates;
    };

    return {
        todos,
        loading,
        toggleTodoStatus,
        addTodo,
        updateTodo,
        deleteTodo,
        getTodoDatesForMonth,
    };
};