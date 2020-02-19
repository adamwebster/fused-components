import React from 'react';
import { StyledBadge } from './style';

export interface Props {
    fcStyle?: string
}
export const Badge = ({ fcStyle = "info", ...rest }: Props) => {
    return (
        <StyledBadge fcStyle={fcStyle} {...rest} />
    )
}
