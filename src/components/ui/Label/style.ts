import styled from 'styled-components';
import { color } from '../../../styles/styles';

export const LabelStyled = styled.label`
  display: inline-block;
  color: ${(props): string => (props.theme === 'dark' ? color.medium : '#6d6d6d')};
  margin-bottom: 5px;
  font-weight: bold;
`;
