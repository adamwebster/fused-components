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
import { Icon } from "../../icon";

export const Dialog = ({
  boxShadow,
  title,
  visible,
  confirmText,
  children,
  onCloseClick,
  fixed,
  fcStyle,
  showOverlay,
  cancelText
}) => {
  return (
    <>
      {visible && (
        <>
          {showOverlay && <Overlay onClick={() => onCloseClick()} />}
          <StyledDialog fcStyle={fcStyle} visible={visible} fixed={fixed} boxShadow={boxShadow}>
            <DialogTitle fcStyle={fcStyle}> 
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
                {cancelText}
              </Button>

              <Button primary fcStyle={fcStyle}>{confirmText}</Button>
            </DialogFooter>
          </StyledDialog>
        </>
      )}
    </>
  );
};

Dialog.propTypes = {
  /** Sets the dialog to be visible */
  visible: PropTypes.bool,
  /** If set to true will show a box shadow below the dialog */
  boxShadow: PropTypes.bool,
  /** Set the text for the confirm text */
  confirmText: PropTypes.string,
  /** Sets the text for the cancel button */
  cancelText: PropTypes.string,
  /** Sets the position for the dialog to be false */
  fixed: PropTypes.bool,
  /** Shows the overlay */
  showOverlay: PropTypes.bool,
  /** What should happen when the close button is clicked */
  onCloseClick: PropTypes.func,
};

Dialog.defaultProps = {
  visible: false,
  boxShadow: true,
  confirmText: "Yes",
  cancelText: 'Cancel',
  fixed: true,
  showOverlay: true,
  onCloseClick: () => {}
};
