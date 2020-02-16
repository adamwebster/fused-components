import React from "react";
import PropTypes from "prop-types";
import { Button } from "../Button/";
import {
  StyledDialog,
  DialogTitle,
  DialogContent,
  CloseButton,
  DialogFooter,
  Overlay
} from "./style";
import { color } from "../../../styles/styles";
import Icon from "../../icon";

export const Dialog = ({
  boxShadow,
  title,
  visible,
  confirmText,
  children,
  onCloseClick,
  fixed,
  showOverlay
}) => {
  return (
    <>
      {visible && (
        <>
          {showOverlay && <Overlay onClick={() => onCloseClick()} />}
          <StyledDialog visible={visible} fixed={fixed} boxShadow={boxShadow}>
            <DialogTitle>
              <h2>{title}</h2>
              <CloseButton aria-label="Close" onClick={() => onCloseClick()}>
                <Icon icon="times" />
              </CloseButton>
            </DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogFooter>
              <Button
                buttonColor={color.mediumdark}
                onClick={() => onCloseClick()}
              >
                Cancel
              </Button>

              <Button primary>{confirmText}</Button>
            </DialogFooter>
          </StyledDialog>
        </>
      )}
    </>
  );
};

Dialog.propTypes = {
  /** If set to true will show a box shadow below the dialog */
  boxShadow: PropTypes.bool,
  confirmText: PropTypes.string,
  fixed: PropTypes.bool,
  showOverlay: PropTypes.bool
};

Dialog.defaultProps = {
  boxShadow: true,
  confirmText: "Yes",
  fixed: true,
  showOverlay: true
};
