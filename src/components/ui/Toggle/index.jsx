import React from 'react';
import {ToggleWrapper, Slider, ToggleLabel } from './style';
import PropTypes from 'prop-types';

export const Toggle = ({ active, showLabels, onClick, ...rest }) => {
    return (
        <ToggleWrapper active={active} onClick={(e) => { onClick(e) }} {...rest}>
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

Toggle.defaultProps ={
    active: false,
    onClick: () => {},
    showLabels: false
  }
  
  Toggle.propTypes = {
    /** Sets the toggle to be active */
    active: PropTypes.bool,
    onClick: PropTypes.func,
    showLabels: PropTypes.bool,
  }