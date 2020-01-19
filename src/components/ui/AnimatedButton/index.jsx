import React from "react";
import { Button } from './style';

const AnimatedButton = ({ disabled, primary, loading, completed, ...rest }) => {
  return (
    <>
      <Button
        disabled={disabled || (loading && !completed)}
        loading={loading}
        completed={completed}
        primary={primary}
        {...rest}
      />
    </>
  );
};

export default AnimatedButton;
