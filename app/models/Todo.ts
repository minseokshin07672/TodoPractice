export interface Todo {
    text: string;
    status: 'todo' | 'done';
}

export interface TodoState {
    [date: string]: Todo[];
}