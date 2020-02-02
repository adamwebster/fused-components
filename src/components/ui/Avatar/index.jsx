import React from 'react';
import { StyledAvatar } from './style';
import PropTypes from 'prop-types';
import variables from '../../../styles/variables';

export const Avatar = ({ ...avatarProps }) => {
    return (
        <StyledAvatar {...avatarProps} />
    )
}

Avatar.defaultProps = {
    size: 'small',
    borderRadius: 'rounded',
    boxShadow: false,
}

Avatar.propTypes = {
    /** tiny | small | medium | large */
    size: PropTypes.string,
    /** rounded | round | square */
    borderRadius: PropTypes.string,
    image: PropTypes.string,
    boxShadow: PropTypes.bool,
}
