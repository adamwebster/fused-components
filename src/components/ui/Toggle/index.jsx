import React from 'react';
import {ToggleWrapper, Slider } from './style';
import PropTypes from 'prop-types';

const Toggle = ({ active, onClick, ...rest }) => {
    return (
        <ToggleWrapper active={active} onClick={() => { onClick() }} {...rest}>
            <Slider active={active} />
        </ToggleWrapper>
    )
}

Toggle.defaultProps ={
    active: false,
    onClick: () => {},
  }
  
  Toggle.propTypes = {
    /** Sets the toggle to be active */
    active: PropTypes.bool,
    onClick: PropTypes.func,
  }

export default Toggle;