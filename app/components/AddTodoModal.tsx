import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import theme from '../styles/theme';

interface AddTodoModalProps {
    isVisible: boolean;
    onClose: () => void;
    onAdd: (text: string) => void;
    month: number;
    day: number;
}

export default function AddTodoModal({ isVisible, onClose, onAdd, month, day }: AddTodoModalProps) {
    const [text, setText] = useState('');

    const handleAdd = () => {
        if (text.trim()) {
            onAdd(text.trim());
            setText('');
            onClose();
        }
    };

    const handleClose = () => {
        setText('');
        onClose();
    };

    return (
        <Modal isVisible={isVisible} onBackdropPress={handleClose}>
            <View style={styles.modalContent}>
                <Text style={styles.title}>{month}월 {day}일 할 일 추가</Text>
                <TextInput
                    style={styles.input}
                    placeholder="할 일을 입력하세요"
                    value={text}
                    onChangeText={setText}
                    autoFocus
                />
                <View style={styles.buttonRow}>
                    <Pressable style={styles.cancelButton} onPress={handleClose}>
                        <Text style={styles.cancelButtonText}>취소</Text>
                    </Pressable>
                    <Pressable style={styles.addButton} onPress={handleAdd}>
                        <Text style={styles.addButtonText}>추가</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: theme.mainWhite,
        borderRadius: theme.borderRadius,
        padding: 20,
    },
    title: {
        fontSize: theme.fontRegular,
        fontWeight: theme.weightSemiBold,
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: theme.borderGrey,
        borderRadius: theme.borderRadiusSmall,
        padding: 12,
        fontSize: theme.fontSmall,
        marginBottom: 16,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 12,
    },
    cancelButton: {
        flex: 1,
        padding: 12,
        borderRadius: theme.borderRadiusSmall,
        backgroundColor: theme.subLightGrey,
        alignItems: 'center',
    },
    cancelButtonText: {
        fontSize: theme.fontSmall,
        color: theme.mainGrey,
    },
    addButton: {
        flex: 1,
        padding: 12,
        borderRadius: theme.borderRadiusSmall,
        backgroundColor: theme.subDarkGrey,
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: theme.fontSmall,
        color: theme.mainWhite,
        fontWeight: theme.weightSemiBold,
    },
});