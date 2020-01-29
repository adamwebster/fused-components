import React from "react";
import { Button } from './style';
import PropTypes from 'prop-types';

/**
- Use an avatar for attributing actions or content to specific users.
- The user's name should always be present when using Avatar – either printed beside the avatar or in a tooltip.
**/

export const AnimatedButton = ({ disabled, icon, loadingIcon, buttonColor, primary, isLoading, completed, children, ...rest }) => {
  const additionalProps = {
  };

  if (isLoading) {
    additionalProps['aria-label'] = 'Loading';
  }
  return (
    <>
      <Button
        disabled={disabled || completed}
        isLoading={isLoading}
        completed={completed}
        primary={primary}
        buttonColor={buttonColor}
        {...additionalProps}
        {...rest}
      >
        {(!isLoading && icon) && <span className="button-icon" >{icon}</span>}
        {!isLoading && children}
        {(isLoading && loadingIcon) && loadingIcon}
      </Button>
    </>
  );
};

AnimatedButton.defaultProps = {
  disabled: false,
  completed: false,
  isLoading: false,
  primary: false,
}

AnimatedButton.propTypes = {
  /** Sets if the button is disabled */
  disabled: PropTypes.bool,
  completed: PropTypes.bool,
  isLoading: PropTypes.bool,
  primary: PropTypes.bool,
  /** Sets the color for the button */
  buttonColor: PropTypes.string,
  /** Sets the icon currently tested with only fontawesome icons */
  icon: PropTypes.object,
}
