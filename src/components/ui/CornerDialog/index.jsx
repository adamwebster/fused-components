import React, { useEffect, useState } from "react";
import {
  CornerDialogStyled,
  DialogTitle,
  DialogContent,
  DialogText,
  DialogFooter,
  CloseButton,
  IconStyled
} from "./style";
import PropTypes from "prop-types";
import { Button } from "../Button";
import { color } from "../../../styles/styles";
import Icon from "../../icon";

export const CornerDialog = ({
  fixed,
  onCloseClick,
  visible,
  title,
  children,
  fcStyle,
  icon,
  ...rest
}) => {

 const [show, setShow] = useState(false);

 useEffect(() => {
     if(!visible){
        setTimeout(() => {
            setShow(false);
        }, 150)
     }else{
         setShow(true)
     }
 }, [visible])
      

  return (
     show &&
        <>  
        <CornerDialogStyled visible={visible} fcStyle={fcStyle} fixed={fixed} {...rest}>
      <DialogTitle fcStyle={fcStyle}>
        {title && title}
        <CloseButton onClick={e => onCloseClick(e)} aria-label="Close">
          <Icon icon="times" />
        </CloseButton>
      </DialogTitle>
      <DialogContent>
        {icon && <IconStyled fcStyle={fcStyle}>{icon}</IconStyled>}
        <DialogText>{children}</DialogText>
      </DialogContent>
      <DialogFooter>
        <Button buttonColor={color.mediumdark} onClick={e => onCloseClick(e)}>
          Close
        </Button>
        <Button fcStyle={fcStyle} primary>
          Learn More
        </Button>
      </DialogFooter>
    </CornerDialogStyled>
    </>
  );
};

CornerDialog.propTypes = {
  /** Set this to false to not show the dialog in the bottom right of the screen */
  fixed: PropTypes.bool,
  icon: PropTypes.object,
  /** Sets the style of the dialog danger | warning | info | success */
  fcStyle: PropTypes.string,
  /** Sets whether the dialog should be shown or not */
  visible: PropTypes.bool,
  /** Sets what should happen when the close button is clicked. At minimum should set the visible property to false. */
  onCloseClick: PropTypes.func.isRequired
};

CornerDialog.defaultProps = {
  fixed: true,
  visible: true,
  onCloseClick: () => {},
};
