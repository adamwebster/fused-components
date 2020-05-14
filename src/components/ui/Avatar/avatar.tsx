import React, { ReactElement } from 'react';
import { StyledAvatar } from './style';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  /** Sets the size of the avatar */
  size?: 'tiny' | 'small' | 'medium' | 'large';
  /** Sets the border radius of the avatar */
  borderRadius?: 'square' | 'rounded' | 'round';
  /** Defines if the avatar should have a box shadow or not */
  boxShadow?: boolean;
  /** The image url for the avatar */
  image?: string;
}

const Avatar = ({
  size = 'small',
  borderRadius = 'rounded',
  boxShadow = false,
  image,
  ...rest
}: Props): ReactElement => {
  return (
    <StyledAvatar role="img" size={size} borderRadius={borderRadius} boxShadow={boxShadow} image={image} {...rest} />
  );
};

export default Avatar;
