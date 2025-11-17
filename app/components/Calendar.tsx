import React from 'react';
import { View, StyleSheet, Text, Pressable, Dimensions } from 'react-native';
import CalendarItem from './CalendarItem';
import theme from '../styles/theme';

interface CalendarProps {
    year: number;
    month: number;
    focusedDay: number | null;
    todoDates: number[];
    onPrevMonth: () => void;
    onNextMonth: () => void;
    onSelectDay: (day: number) => void;
    theme: any;
}

const weekdayLabels = ['월', '화', '수', '목', '금', '토', '일'];

const SCREEN_WIDTH = Dimensions.get('window').width;
const CELL_SIZE = SCREEN_WIDTH / 7;

export default function Calendar({
    year,
    month,
    focusedDay,
    todoDates,
    onPrevMonth,
    onNextMonth,
    onSelectDay,
    theme,
}: CalendarProps) {
    const today = new Date();

    const isThisMonth =
        today.getFullYear() === year && today.getMonth() + 1 === month;
    const currentDay = isThisMonth ? today.getDate() : -1;

    const firstDay = new Date(year, month - 1, 1).getDay();
    const offset = firstDay === 0 ? 6 : firstDay - 1;

    const daysInMonth = new Date(year, month, 0).getDate();

    const totalCells = offset + daysInMonth;
    const weeks: (number | null)[][] = [];
    let day = 1;

    for (let i = 0; i < totalCells; i++) {
        const weekIndex = Math.floor(i / 7);

        if (!weeks[weekIndex]) weeks[weekIndex] = [];

        if (i < offset) weeks[weekIndex].push(null);
        else {
            weeks[weekIndex].push(day);
            day++;
        }
    }

    return (
        <View style={styles.calendarContainer}>
            <View style={styles.header}>
                <Pressable onPress={onPrevMonth}>
                    <Text style={styles.headerBtn}>이전 달</Text>
                </Pressable>

                <View style={styles.headerCenter}>
                    <Text style={styles.headerYear}>{year}년</Text>
                    <Text style={styles.headerMonth}>{month}월</Text>
                </View>

                <Pressable onPress={onNextMonth}>
                    <Text style={styles.headerBtn}>다음 달</Text>
                </Pressable>
            </View>

            <View style={styles.weekdayRow}>
                {weekdayLabels.map((label) => (
                    <View key={label} style={styles.weekdayCell}>
                        <Text style={styles.weekdayText}>{label}</Text>
                    </View>
                ))}
            </View>

            {weeks.map((week, wIndex) => (
                <View key={wIndex} style={styles.weekRow}>
                    {week.map((dayOrNull, dIndex) => {
                        if (dayOrNull === null) {
                            return <View key={`empty-${wIndex}-${dIndex}`} style={styles.dayCell} />;
                        }

                        const dayNumber = dayOrNull;
                        let status: 'idle' | 'todo' | 'focused' = 'idle';

                        if (dayNumber === focusedDay) status = 'focused';
                        else if (todoDates.includes(dayNumber)) status = 'todo';

                        return (
                            <Pressable
                                key={dayNumber}
                                onPress={() => onSelectDay(dayNumber)}
                                style={styles.dayCell}
                            >
                                <CalendarItem day={dayNumber} status={status} theme={theme} />
                            </Pressable>
                        );
                    })}
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    calendarContainer: {
        paddingTop: 20,
        width: '100%',
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        paddingHorizontal: 16,
    },

    headerBtn: {
        fontSize: theme.fontRegular,
        fontWeight: theme.weightSemiBold,
    },

    headerCenter: {
        alignItems: 'center',
    },

    headerYear: {
        fontSize: theme.fontTiny,
        fontWeight: theme.weightMedium,
        color: theme.mainGrey,
        marginBottom: 2,
    },

    headerMonth: {
        fontSize: theme.fontMedium,
        fontWeight: theme.weightBold,
    },

    weekdayRow: {
        flexDirection: 'row',
    },

    weekdayCell: {
        width: CELL_SIZE,
        alignItems: 'center',
        paddingVertical: 4,
    },

    weekdayText: {
        fontSize: theme.fontMicro,
        fontWeight: theme.weightSemiBold,
    },

    weekRow: {
        flexDirection: 'row',
    },

    dayCell: {
        width: CELL_SIZE,
        height: CELL_SIZE,
        alignItems: 'center',
        justifyContent: 'center',
    },
});