import React, { useState, useEffect } from "react";
import { StyledToast } from "./styles";

export const Toast = ({ title, fcStyle, children }) => {
  const [visible, setVisible] = useState(true);
  const [removing, setRemoving] = useState(false);

  useEffect(() => {
    setTimeout(() => setRemoving(true), 4000)

      setTimeout(() => setVisible(false), 4500)
  })
  return (
    <>
      {visible && (
        <StyledToast removing={removing} fcStyle={fcStyle} title={title}>
          {children}
        </StyledToast>
      )}
    </>
  );
};
