import React, { ReactNode, ReactElement, useRef } from 'react';
import { Label, IconStyled, RadioInput } from './style';
import { Icon } from '../../icon';
import { FCThemeConsumer } from '../../../theming/FCTheme';

interface Props extends React.HTMLProps<HTMLInputElement> {
  /** The id of the element. Required for accessibility.  */
  id: string;
  /**
   * @ignore
   */
  children: ReactNode;
  /** If the radio is checked */
  checked?: boolean;
  /** If the radio is in its warning state */
  inWarning?: boolean;
  /** If the radio is in its error state */
  inError?: boolean;
  /** The function that is called when the input changes between selected and not selected */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** The value of the input */
  value?: string;
  /**
   * @ignore
   */
  onKeyDown?: (e: any) => void;
  /**
   * @ignore
   */
  onClick?: () => void;
  /**
   * @ignore
   */
  radioTabIndex?: number;
}
const Radio = React.forwardRef<HTMLSpanElement, Props>(
  (
    {
      children,
      checked = false,
      inWarning = false,
      inError = false,
      value,
      onKeyDown = (): void => undefined,
      onChange = (): void => undefined,
      onClick,
      id,
      radioTabIndex = 0,
    }: Props,
    ref,
  ): ReactElement => {
    const RadioRef = useRef(null);
    return (
      <FCThemeConsumer>
        {(themeContext): ReactElement => (
          <label onClick={() => onClick && onClick()}>
            <RadioInput
              id={id}
              value={value}
              type="radio"
              ref={RadioRef}
              tabIndex={-1}
              checked={checked}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => onChange(e)}
            />

            <IconStyled
              tabIndex={radioTabIndex}
              ref={ref}
              onKeyDown={e => onKeyDown && onKeyDown(e)}
              role="radio"
              inError={inError}
              inWarning={inWarning}
              theme={themeContext.theme}
              aria-checked={checked ? true : false}
            >
              <Icon aria-labelledby={`labelfor-${id}`} icon={checked ? 'radio-checked' : 'radio'} />
            </IconStyled>

            <Label id={`labelfor-${id}`} theme={themeContext.theme} inError={inError} inWarning={inWarning}>
              {children}
            </Label>
          </label>
        )}
      </FCThemeConsumer>
    );
  },
);

Radio.displayName = 'Radio';

export default Radio;
