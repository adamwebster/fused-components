import React, { ReactNode, ReactElement } from 'react';
import { Label, IconStyled, CheckInput } from './style';
import { Icon } from '../../icon/';
import { FCThemeConsumer } from '../../../theming/FCTheme';

export interface Props extends React.HTMLProps<HTMLInputElement> {
  children?: ReactNode;
  /** Set to true if the checkbox is checked */
  checked?: boolean;
  /** Set the checkbox to be in its error state */
  inError?: boolean;
  /** Set the checkbox to be in its warning state */
  inWarning?: boolean;
  /** The on change function for the input */
  onChange?: () => void;
  id: string;
}

export const Checkbox = ({
  children,
  checked = false,
  inError = false,
  inWarning = false,
  onChange = (): void => undefined,
  id,
}: Props): ReactElement => {
  return (
    <FCThemeConsumer>
      {(themeContext): ReactNode => (
        <label>
          <CheckInput type="checkbox" checked={checked} onChange={(): void => onChange()} />

          <IconStyled theme={themeContext.theme} inError={inError} inWarning={inWarning}>
            <Icon aria-labelledby={`labelfor-${id}`} icon={checked ? 'checkbox-checked' : 'checkbox'} />
          </IconStyled>

          <Label id={`labelfor-${id}`} theme={themeContext.theme} inError={inError} inWarning={inWarning}>
            {children}
          </Label>
        </label>
      )}
    </FCThemeConsumer>
  );
};
