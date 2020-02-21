import React from 'react';
import { StyledBadge } from './style';
import { fcStyles } from '../../../common/types';

export interface Props {
    /** Set the style of the badge */
    fcStyle?: fcStyles
}
export const Badge = ({ fcStyle = "info", ...rest }: Props) => {
    return (
        <StyledBadge fcStyle={fcStyle} {...rest} />
    )
}
