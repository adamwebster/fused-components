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
import { Button } from "../Button";
import { color } from "../../../styles/styles";
import { Icon } from "../../icon";

export interface Props {
  fixed?: Boolean,
  onCloseClick: Function,
  visible?: Boolean,
  cancelText?: String,
  confirmText?: String,
  title?: String,
  fcStyle? : String,
  icon? : String,
  children: Node,
}
export const CornerDialog = ({
  fixed = false,
  onCloseClick = () => {},
  visible = false,
  cancelText = 'Cancel',
  confirmText = 'Learn More',
  title,
  children,
  fcStyle,
  icon,
  ...rest
}:Props) => {

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
        <Button buttonColor={color.mediumdark} onClick={() => onCloseClick()}>
          {cancelText}
        </Button>
        <Button fcStyle={fcStyle} primary>
          {confirmText}
        </Button>
      </DialogFooter>
    </CornerDialogStyled>
    </>
  );
};
