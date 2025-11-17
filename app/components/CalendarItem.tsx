import React from 'react';
import styled from '@emotion/native';

type CalendarItemState = 'idle' | 'todo' | 'focused';

interface Props {
    day: number;
    status: CalendarItemState;
    theme: any;
}

export default function CalendarItem({ day, status, theme }: Props) {
    const getBackgroundColor = () => {
        if (status === 'focused') return theme.mainDarkGrey;
        if (status === 'todo') return theme.mainLightGrey;
        return theme.mainWhite;
    };

    const getTextColor = () => {
        return status !== 'idle' ? theme.mainWhite : theme.mainDarkGrey;
    };

    return (
        <Container style={{ backgroundColor: getBackgroundColor() }}>
            <Day style={{ color: getTextColor() }}>{day}</Day>
        </Container>
    );
}

const Container = styled.View({
    width: '80%',
    aspectRatio: 1,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
});

const Day = styled.Text({
    fontSize: 18,
    fontWeight: '600',
});