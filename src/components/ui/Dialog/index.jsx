import React from 'react';
import PropTypes from 'prop-types';
import {Button} from '../Button/'
import { StyledDialog, DialogTitle, DialogContent, CloseButton, DialogFooter } from './style';
import { color } from '../../../styles/styles';
import FCTimes from '../../icons/FCTimes';

export const Dialog = ({boxShadow, title, confirmText, children}) => {
  return(
    <StyledDialog boxShadow={boxShadow}>
      <DialogTitle><h2>{title}</h2>
      <CloseButton aria-label="Close"><FCTimes /></CloseButton>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogFooter>
      <Button buttonColor={color.mediumdark}>Cancel</Button>

        <Button primary>{confirmText}</Button>
      </DialogFooter>
    </StyledDialog>
  )
}

Dialog.propTypes = {
  /** If set to true will show a box shadow below the dialog */
  boxShadow: PropTypes.bool,
  confirmText: PropTypes.string,
}

Dialog.defaultProps = {
  boxShadow: true,
  confirmText: 'Yes'
}