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
    size: '48px',
    borderRadius: variables.borderRadius,
    boxShadow: false,
}

Avatar.propTypes = {
    size: PropTypes.string,
    borderRadius: PropTypes.string,
    image: PropTypes.string,
    boxShadow: PropTypes.string,
}
