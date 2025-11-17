import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import Calendar from '../components/Calendar';
import TodoItem from '../components/TodoItem';
import { useTodos } from '../hooks/useTodos';
import theme from '../styles/theme';
import AddTodoModal from '../components/AddTodoModal';
import EditTodoModal from '../components/EditTodoModal';

export default function MainScreen() {
    const { todos, loading, toggleTodoStatus, addTodo, updateTodo, deleteTodo, getTodoDatesForMonth } = useTodos();
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [focusedDay, setFocusedDay] = useState<number>(new Date().getDate());
    const [isAddModalVisible, setAddModalVisible] = useState(false);
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [editingTodo, setEditingTodo] = useState<{ text: string; index: number } | null>(null);

    const dateKey = `${year}-${String(month).padStart(2, '0')}-${String(focusedDay).padStart(2, '0')}`;
    const currentTodos = todos[dateKey] || [];
    const todoItems = currentTodos.filter(todo => todo.status === 'todo');
    const doneItems = currentTodos.filter(todo => todo.status === 'done');
    const todoDates = getTodoDatesForMonth(year, month);

    const handleAddTodo = (text: string) => {
        addTodo(dateKey, text);
    };

    const handleEditTodo = (text: string) => {
        if (editingTodo !== null) {
            updateTodo(dateKey, editingTodo.index, text);
        }
    };

    const handleDeleteTodo = () => {
        if (editingTodo !== null) {
            deleteTodo(dateKey, editingTodo.index);
        }
    };

    const openEditModal = (index: number) => {
        setEditingTodo({ text: currentTodos[index].text, index });
        setEditModalVisible(true);
    };

    const handlePrevMonth = () => {
        if (month === 1) {
            setYear(year - 1);
            setMonth(12);
        } else {
            setMonth(month - 1);
        }
    };

    const handleNextMonth = () => {
        if (month === 12) {
            setYear(year + 1);
            setMonth(1);
        } else {
            setMonth(month + 1);
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Todo Practice</Text>
            <Calendar
                year={year}
                month={month}
                focusedDay={focusedDay}
                todoDates={todoDates}
                onPrevMonth={handlePrevMonth}
                onNextMonth={handleNextMonth}
                onSelectDay={setFocusedDay}
                theme={theme}
            />

            <View style={styles.todoSection}>
                <Text style={styles.todoTitle}>{focusedDay}일 할 일</Text>
                <ScrollView style={styles.scrollView}>
                    {todoItems.length > 0 && (
                        <>
                            <Text style={styles.sectionLabel}>TODO</Text>
                            {todoItems.map((todo, index) => (
                                <TodoItem
                                    key={`todo-${index}`}
                                    text={todo.text}
                                    status={todo.status}
                                    onPress={() => toggleTodoStatus(dateKey, currentTodos.indexOf(todo))}
                                    onIconPress={() => openEditModal(currentTodos.indexOf(todo))}
                                />
                            ))}
                        </>
                    )}

                    {doneItems.length > 0 && (
                        <>
                            <Text style={styles.sectionLabel}>DONE</Text>
                            {doneItems.map((todo, index) => (
                                <TodoItem
                                    key={`done-${index}`}
                                    text={todo.text}
                                    status={todo.status}
                                    onPress={() => toggleTodoStatus(dateKey, currentTodos.indexOf(todo))}
                                    onIconPress={() => openEditModal(currentTodos.indexOf(todo))}
                                />
                            ))}
                        </>
                    )}
                </ScrollView>
            </View>

            <AddTodoModal
                isVisible={isAddModalVisible}
                onClose={() => setAddModalVisible(false)}
                onAdd={handleAddTodo}
                month={month}
                day={focusedDay}
            />


            <EditTodoModal
                isVisible={isEditModalVisible}
                onClose={() => {
                    setEditModalVisible(false);
                    setEditingTodo(null);
                }}
                onEdit={handleEditTodo}
                onDelete={handleDeleteTodo}
                initialText={editingTodo?.text || ''}
            />

            <Pressable style={styles.floatingButton} onPress={() => setAddModalVisible(true)}>
                <Text style={styles.floatingButtonText}>+</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: theme.fontLarge,
        textAlign: 'center',
        marginVertical: 10,
    },
    todoSection: {
        flex: 1,
        paddingHorizontal: 16,
        marginTop: 20,
    },
    todoTitle: {
        fontSize: theme.fontRegular,
        fontWeight: theme.weightSemiBold,
        marginBottom: 12,
    },
    scrollView: {
        flex: 1,
    },
    sectionLabel: {
        fontSize: theme.fontSmall,
        fontWeight: theme.weightSemiBold,
        color: theme.mainGrey,
        marginTop: 8,
        marginBottom: 8,
    },
    floatingButton: {
        position: 'absolute',
        right: 20,
        bottom: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: theme.subDarkGrey,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: theme.mainBlack,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    floatingButtonText: {
        fontSize: 32,
        color: theme.mainWhite,
        fontWeight: theme.weightLight,
    },
});