import React from "react";
import { Button } from './style';
import PropTypes from 'prop-types';

/**
- Use an avatar for attributing actions or content to specific users.
- The user's name should always be present when using Avatar – either printed beside the avatar or in a tooltip.
**/

export const AnimatedButton = ({ disabled, icon, loadingIcon, buttonColor, primary, loading, completed, children, ...rest }) => {
  const additionalProps = {
  };

  if (loading) {
    additionalProps['aria-label'] = 'Loading';
  }
  return (
    <>
      <Button
        disabled={disabled || loading || completed}
        loading={loading ? 1 : 0}
        completed={completed}
        primary={primary}
        buttonColor={buttonColor}
        {...additionalProps}
        {...rest}
      >
        {(!loading && icon) && <span className="button-icon" >{icon}</span>}
        {!loading && children}
        {(loading && loadingIcon) && loadingIcon}
      </Button>
    </>
  );
};

AnimatedButton.defaultProps = {
  disabled: false,
  completed: false,
  loading: false,
  primary: false,
}

AnimatedButton.propTypes = {
  /** Sets if the button is disabled */
  disabled: PropTypes.bool,
  completed: PropTypes.bool,
  loading: PropTypes.bool,
  primary: PropTypes.bool,
  /** Sets the color for the button */
  buttonColor: PropTypes.string,
  /** Sets the icon currently tested with only fontawesome icons */
  icon: PropTypes.object,
}
