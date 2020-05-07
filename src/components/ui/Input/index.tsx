import React, { useContext, forwardRef } from 'react';
import { StyledInput, InputWrapper, IconWrapper } from './style';
import { Icon } from '../../icon';
import { FCTheme } from '../../../theming/FCTheme';

export interface Props extends React.HTMLAttributes<HTMLInputElement> {
  /** Set the icon for the input */
  icon?: string;
  /** Set if the input is in error */
  inError?: boolean;
  /** Set if the input is in warning */
  inWarning?: boolean;
  /** The id for the input */
  id?: string;
  /** The value for the input */
  value?: string;
  /** What should happen when the input value changes */
  onChange?: (e: never) => void;
  /** The placeholder for the input */
  placeholder?: string;
  /** Whether the input should be disabled or not */
  disabled?: boolean;
  /** The input type */
  type?: string;
  theme?: unknown;
  // sets if the input is in a read only mode
  readOnly?: boolean;
  autoComplete?: string;
}
export const Input = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
  const theme = useContext(FCTheme);
  const { id, inError, inWarning, icon, readOnly, autoComplete, ...rest } = props;
  return (
    <InputWrapper>
      {icon && (
        <IconWrapper theme={theme.theme} inError={inError} inWarning={inWarning}>
          <Icon aria-hidden icon={icon} />
        </IconWrapper>
      )}
      <StyledInput
        id={id}
        ref={ref}
        icon={icon}
        inError={inError}
        inWarning={inWarning}
        theme={theme.theme}
        readOnly={readOnly}
        autoComplete={autoComplete}
        {...rest}
      />
    </InputWrapper>
  );
});

Input.displayName = 'Input';
