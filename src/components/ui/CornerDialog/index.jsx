import React from 'react';
import { CornerDialogStyled, DialogTitle, DialogContent, DialogText, DialogFooter, CloseButton, IconStyled } from './style';
import PropTypes from 'prop-types';
import {Button} from '../Button';
import { color } from '../../../styles/styles';
import Icon from '../../icon';

export const CornerDialog = ({fixed, onCloseClick, visible, title, children, fcStyle, icon, ...rest}) => {
    return(
        visible &&
            <>
        <CornerDialogStyled fcStyle={fcStyle} fixed={fixed} {...rest}>
        <DialogTitle fcStyle={fcStyle}>{title && title}
        <CloseButton onClick={(e) => onCloseClick(e)} aria-label="Close"><Icon icon="times" /></CloseButton>
        </DialogTitle>
        <DialogContent>
        {icon && <IconStyled fcStyle={fcStyle}>{icon}</IconStyled>}
        <DialogText>
        {children}
        </DialogText>
        </DialogContent>
        <DialogFooter>
        <Button buttonColor={color.border} onClick={(e) => onCloseClick(e)} >Close</Button>
        <Button fcStyle={fcStyle} primary>Learn More</Button>
        </DialogFooter>
        </CornerDialogStyled>
    </>    
    
    )
}

CornerDialog.propTypes = {
   /** Set this to false to not show the dialog in the bottom right of the screen */
    fixed: PropTypes.bool,
    icon: PropTypes.object,
    /** Sets the style of the dialog danger | warning | info | success */
    fcStyle: PropTypes.string,
    visible: PropTypes.bool,

}

CornerDialog.defaultProps = {
    fixed: true,
    visible: true,
}