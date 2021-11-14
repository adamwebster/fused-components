import styled from 'styled-components';

export const StyledCard = styled.div`
  display: flex;
  border: solid 1px #ccc;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.card?.backgroundColor};
  box-shadow: ${({ theme }) => theme.card?.boxShadow};
  flex-direction: column;
`;

export const StyledCardHeader = styled.div`
  padding: 16px;
`;

export const StyledCardBody = styled.div`
  padding: 16px;
`;

export const StyledCardImage = styled.div`
  max-height: 400px;
  display: flex;
  overflow: hidden;
  img {
    object-fit: cover;
    max-width: 100%;
    object-position: center center;
  }
`;

export const StyledCardAction = styled.div``;

export const StyledCardActions = styled.div`
  display: flex;
  padding: 16px;
  ${StyledCardAction} + ${StyledCardAction} {
    margin-left: 16px;
  }
`;

export const StyledCardFooter = styled.div``;
