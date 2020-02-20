import React from 'react';
import {ToggleWrapper, Slider, ToggleLabel } from './style';

export interface Props {
    /** If the toggle is active or not */
    active: boolean,
    /** Display the on and off labels */
    showLabels: boolean,
    /** What should happen when the toggle is clicked */
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
