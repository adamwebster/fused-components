import React from 'react';
import {ToggleWrapper, Slider, ToggleLabel } from './style';

export interface Props {
    active: boolean,
    showLabels: boolean,
    onClick: (e: any) => void
}
export const Toggle = ({ active = false, showLabels = false, onClick = (e) => {}, ...rest }:Props) => {
    return (
        <ToggleWrapper active={active} onClick={(e: any) => { onClick(e) }} {...rest}>
            <Slider active={active} />
        {showLabels &&
        <>
        <ToggleLabel>On</ToggleLabel>
        <ToggleLabel>Off</ToggleLabel>
        </>
        }
        </ToggleWrapper>
    )
}
