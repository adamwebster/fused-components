import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

interface AvatarProps {
  size?: 'tiny' | 'small' | 'medium' | 'large';
  borderRadius?: 'square' | 'rounded' | 'round';
  boxShadow?: boolean;
  image?: string;
}
export const StyledAvatar = styled.div<AvatarProps>`
  ${(props): string[] => {
    let size = '';
    let borderRadius = '';

    switch (props.size) {
      case 'medium':
        size = `
            width: 44px;
            height: 44px;
            `;
        break;
      case 'large':
        size = `
            width: 64px;
            height: 64px;
            `;
        break;

      case 'tiny':
        size = `
            width: 16px;
            height: 16px;
            `;
        break;
      case 'small':
      default:
        size = `
            width:24px;
            height:24px;
            `;
    }

    switch (props.borderRadius) {
      case 'round':
        borderRadius = 'border-radius: 50%;';
        break;
      case 'square':
        borderRadius = 'border-radius: 0;';
        break;
      case 'rounded':
      default:
        borderRadius = 'border-radius: 10%;';
    }
    return [size, borderRadius];
  }}
 
  background-image: url(${(props): string => props.image as string});
  background-size: cover;
  ${(props): false | FlattenSimpleInterpolation | undefined =>
    props.boxShadow &&
    css`
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
    `}
`;
