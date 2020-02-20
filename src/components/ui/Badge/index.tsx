import React from 'react';
import { StyledBadge } from './style';

export interface Props {
    /** Set the style of the badge */
    fcStyle?: 'danger' | 'warning' | 'info' | 'success'
}
export const Badge = ({ fcStyle = "info", ...rest }: Props) => {
    return (
        <StyledBadge fcStyle={fcStyle} {...rest} />
    )
}
