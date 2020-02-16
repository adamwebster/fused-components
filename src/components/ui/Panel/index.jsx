import React, { useState, useEffect } from "react";
import {
  StyledPanel,
  DialogTitle,
  DialogContent,
  DialogText,
  DialogFooter,
  CloseButton
} from "./style";
import { Button } from "../Button";
import PropTypes from "prop-types";
import { color } from "../../../styles/styles";
import Icon from "../../icon";

export const Panel = ({
  fcStyle,
  title,
  onCloseClick,
  fixed,
  visible,
  children,
  position
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        setShow(false);
      }, 500);
    } else {
      setShow(true);
    }
  }, [visible]);

  return (
    show && (
      <>
        <StyledPanel position={position} visible={visible} fixed={fixed}>
          <DialogTitle fcStyle={fcStyle}>
            {title && title}
            <CloseButton onClick={e => onCloseClick(e)} aria-label="Close">
              <Icon icon="times" />
            </CloseButton>
          </DialogTitle>
          <DialogContent>
            <DialogText>{children}</DialogText>
          </DialogContent>
          <DialogFooter>
            <Button buttonColor={color.border} onClick={e => onCloseClick(e)}>
              Close
            </Button>
            <Button fcStyle={fcStyle} primary>
              Save
            </Button>
          </DialogFooter>
        </StyledPanel>
      </>
    )
  );
};

Panel.propTypes = {
  /** Set this to false to not show the dialog in the bottom right of the screen */
  fixed: PropTypes.bool,
  /** Sets whether the dialog should be shown or not */
  visible: PropTypes.bool,
  /** Sets what should happen when the close button is clicked. At minimum should set the visible property to false. */
  onCloseClick: PropTypes.func.isRequired,
  /** left | right*/
  position: PropTypes.string,
};

Panel.defaultProps = {
  fixed: true,
  visible: true,
  onCloseClick: () => {},
  position: 'right'
};
