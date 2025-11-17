import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import theme from '../styles/theme';

type TodoItemStatus = 'todo' | 'done';

interface TodoItemProps {
    text: string;
    status: TodoItemStatus;
    onPress: () => void;
    onIconPress?: () => void;
}

export default function TodoItem({ text, status, onPress, onIconPress }: TodoItemProps) {
    const prefix = status === 'done' ? '✓ ' : '□ ';

    const backgroundColor =
        status === 'done'
            ? theme.borderGrey
            : theme.subLightGrey;

    const textColor =
        status === 'done'
            ? theme.subDarkGrey
            : theme.mainDarkGrey;


    return (
        <View style={[styles.container, { backgroundColor }]}>
            <Pressable style={{ flex: 1 }} onPress={onPress}>
                <Text style={[styles.todoText, { color: textColor }]}>
                    {prefix}{text}
                </Text>
            </Pressable>

            <Pressable onPress={onIconPress}>
                <Icon
                    name="dots-three-horizontal"
                    size={20}
                    color={textColor}
                />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 12,
        marginBottom: 8,
        borderRadius: 8,
    },
    todoText: {
        fontSize: theme.fontSmall,
    },
});