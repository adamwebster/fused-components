import React from 'react';
import { StyledAvatar } from './style';

export interface Props {
    size?: String,
    borderRadius?: String,
    boxShadow?: Boolean,
    image?: String,
}

export const Avatar = ({ size = 'small', borderRadius = 'rounded', boxShadow = false, image, ...rest }: Props) => {
    return (
        <StyledAvatar size={size} borderRadius={borderRadius} boxShadow={boxShadow} image={image} {...rest} />
    )
}
