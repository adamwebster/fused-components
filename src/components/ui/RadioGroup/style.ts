import styled, { css } from 'styled-components';

interface RWProps {
  inline?: boolean;
}
export const RadioWrapper = styled.div<RWProps>`
  width: ${({ inline }) => (inline ? 'fit-content' : '100%')};
  ${({ inline }) =>
    inline &&
    css`
      display: inline-block;
      margin-right: 10px;
    `}
`;
