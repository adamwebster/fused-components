import React, { ReactNode, ReactElement } from 'react';
import { Label, IconStyled, RadioInput } from './style';
import { Icon } from '../../icon';
import { FCThemeConsumer } from '../../../theming/FCTheme';

export interface Props extends React.HTMLProps<HTMLInputElement> {
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
  id: string;
  onKeyPress?: () => void;
}
export const Radio = ({
  children,
  checked = false,
  inWarning = false,
  inError = false,
  value,
  onKeyPress = (): void => undefined,
  onChange = (): void => undefined,
  id,
}: Props): ReactElement => {
  return (
    <FCThemeConsumer>
      {(themeContext): ReactElement => (
        <label>
          <RadioInput
            id={id}
            value={value}
            type="radio"
            tabIndex={-1}
            checked={checked}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => onChange(e)}
          />

          <IconStyled
            onKeyPress={() => onKeyPress && onKeyPress()}
            tabIndex={0}
            role="radio"
            inError={inError}
            inWarning={inWarning}
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
};
