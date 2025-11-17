import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

type TodoItemStatus = 'todo' | 'done';

interface TodoItemProps {
    text: string;
    status: TodoItemStatus;
    onPress: () => void;
}

export default function TodoItem({ text, status, onPress }: TodoItemProps) {
    const prefix = status === 'done' ? 'v ' : 'ㅁ ';

    return (
        <Pressable onPress={onPress}>
            <Text style={[
                styles.todoText,
                status === 'done' && styles.doneText
            ]}>
                {prefix}{text}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    todoText: {
        fontSize: 16,
        padding: 12,
        backgroundColor: '#f5f5f5',
        marginBottom: 8,
        borderRadius: 8,
    },
    doneText: {
        backgroundColor: '#333',
        color: '#fff',
    },
});