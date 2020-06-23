import React, { useContext, forwardRef } from 'react';
import { StyledInput, InputWrapper, IconWrapper } from './style';
import { Icon } from '../../icon';
import { FCTheme } from '../../../theming/FCTheme';

export interface Props extends React.HTMLAttributes<HTMLInputElement> {
  /** The id of the element. Required for accessibility.  */
  id: string;
  /** Set the icon for the input */
  icon?: string;
  /** Set if the input is in error */
  inError?: boolean;
  /** Set if the input is in warning */
  inWarning?: boolean;
  /** The value for the input */
  value?: string;
  /** What should happen when the input value changes */
  onChange?: (e: any) => void;
  /** The placeholder for the input */
  placeholder?: string;
  /** Whether the input should be disabled or not */
  disabled?: boolean;
  /** The input type */
  type?: string;
  /**
   * @ignore
   */
  theme?: unknown;
  /** Sets if the input is in a read only mode */
  readOnly?: boolean;
  /**
   * @ignore
   */
  name?: string;
  /**
   * @ignore
   */
  autoComplete?: string;
}
const Input = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
  const theme = useContext(FCTheme);
  const { id, inError, inWarning, icon, readOnly, autoComplete, ...rest } = props;
  return (
    <InputWrapper>
      {icon && (
        <IconWrapper aria-hidden theme={theme.theme} inError={inError} inWarning={inWarning}>
          <Icon icon={icon} />
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

export default Input;
