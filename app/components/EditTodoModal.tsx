import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import theme from '../styles/theme';

interface EditTodoModalProps {
    isVisible: boolean;
    onClose: () => void;
    onEdit: (text: string) => void;
    onDelete: () => void;
    initialText: string;
}

export default function EditTodoModal({ isVisible, onClose, onEdit, onDelete, initialText }: EditTodoModalProps) {
    const [text, setText] = useState(initialText);

    const handleEdit = () => {
        if (text.trim()) {
            onEdit(text.trim());
            onClose();
        }
    };

    const handleDelete = () => {
        onDelete();
        onClose();
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <Modal isVisible={isVisible} onBackdropPress={onClose} onModalHide={onClose}>
            <View style={styles.modalContent}>
                <Text style={styles.title}>할 일 수정</Text>
                <TextInput
                    style={styles.input}
                    placeholder="할 일을 입력하세요"
                    value={text}
                    onChangeText={setText}
                    autoFocus
                />
                <View style={styles.buttonRow}>
                    <Pressable style={styles.deleteButton} onPress={handleDelete}>
                        <Text style={styles.deleteButtonText}>삭제</Text>
                    </Pressable>
                    <Pressable style={styles.editButton} onPress={handleEdit}>
                        <Text style={styles.editButtonText}>수정</Text>
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
    deleteButton: {
        flex: 1,
        padding: 12,
        borderRadius: theme.borderRadiusSmall,
        backgroundColor: theme.subRed,
        alignItems: 'center',
    },
    deleteButtonText: {
        fontSize: theme.fontSmall,
        color: theme.mainWhite,
        fontWeight: theme.weightSemiBold,
    },
    editButton: {
        flex: 1,
        padding: 12,
        borderRadius: theme.borderRadiusSmall,
        backgroundColor: theme.subDarkGrey,
        alignItems: 'center',
    },
    editButtonText: {
        fontSize: theme.fontSmall,
        color: theme.mainWhite,
        fontWeight: theme.weightSemiBold,
    },
});