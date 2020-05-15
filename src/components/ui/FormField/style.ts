import styled from 'styled-components';
import { color } from '../../../styles/styles';
import { lighten } from 'polished';

export const HintText = styled.p`
  font-size: 0.9em;
  color: ${(props): string => (props.theme === 'dark' ? color.medium : color.dark)};
  margin-top: 3px;
  margin-bottom: 3px;
`;

export const ValidationMessage = styled.p`
  font-size: 1em;
  color: ${(props): string => (props.theme === 'dark' ? lighten(0.25, color.danger) : color.danger)};
  margin-top: 3px;
  margin-bottom: 3px;
`;

export const RequiredMark = styled.span`
  color: ${color.danger};
  font-weight: bold;
  font-size: 1.2em;
`;

export const InputWrapper = styled.div`
  width: 100%;
`;

export const FormFieldWrapper = styled.div`
  margin-bottom: 10px;
`;
