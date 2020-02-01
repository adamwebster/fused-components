import React from 'react';
import PropTypes from 'prop-types';
import { StyledBadge } from './style';

export const Badge = ({fcStyle, ...rest}) => {
    return(
        <StyledBadge fcStyle={fcStyle} {...rest} />
    )
}

Badge.propTypes = {
    fcStyle: PropTypes.string,
}