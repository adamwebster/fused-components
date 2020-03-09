import React from "react";
import { Badge } from "../components/ui/Badge";
import { FCThemeProvider } from "../theming/FCTheme";
import { DarkModeWrapper } from "../common/styles";
import styled from "styled-components";

const FlexWrapper = styled.div`
  display: flex;
  *{
    margin-right: 25px;
  }
`
export const BadgeDemoDarkMode = () => {
  const AlertText = "This is some text that will be shown with the alert";
  return (
    <FCThemeProvider value={{ theme: "dark" }}>
      <DarkModeWrapper>
        <FlexWrapper>
        <Badge>Badge</Badge>
        <Badge fcStyle="info">Info</Badge>
        <Badge fcStyle="warning">Warning</Badge>
        <Badge fcStyle="danger">Danger</Badge>
        <Badge fcStyle="success">Success</Badge>
        </FlexWrapper>
      </DarkModeWrapper>
    </FCThemeProvider>
  );
};
