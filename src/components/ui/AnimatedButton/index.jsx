import React from "react";
import { Button } from './style';
import PropTypes from 'prop-types';

/**
- Use an avatar for attributing actions or content to specific users.
- The user's name should always be present when using Avatar – either printed beside the avatar or in a tooltip.
**/

const AnimatedButton = ({ disabled, icon, buttonColor, primary, loading, completed,children, ...rest }) => {
  return (
    <>
      <Button
        disabled={disabled || (loading || completed)}
        loading={loading}
        completed={completed}
        primary={primary}
        buttonColor={buttonColor}
        {...rest}
      >
      {!loading && children}
      </Button>
    </>
  );
};

AnimatedButton.defaultProps ={
  disabled: false,
  completed: false,
  loading: false,
  primary:false,
}

AnimatedButton.propTypes = {
  /** Sets if the button is disabled */
  disabled: PropTypes.bool,
  completed: PropTypes.bool,
  loading: PropTypes.bool,
  primary: PropTypes.bool,
  /** Sets the color for the button */
  buttonColor: PropTypes.string,
}

export default AnimatedButton;
