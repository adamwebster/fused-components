import React, { ReactElement, ReactNode, HTMLAttributes } from 'react';
import { ToggleWrapper, Slider, ToggleLabel } from './style';
import { FCThemeConsumer } from '../../../theming/FCTheme';

interface Props extends HTMLAttributes<HTMLDivElement> {
  /** The id of the element. Required for accessibility.  */
  id: string;
  /** If the toggle is active or not */
  active?: boolean;
  /** Display the on and off labels */
  showLabels?: boolean;
  /** What should happen when the toggle is clicked */
  onClick?: (e: unknown) => void;
  /** If the toggle is disabled or not */
  disabled?: boolean;
}
export const Toggle = ({
  id,
  active = false,
  showLabels = false,
  onClick = (): void => undefined,
  disabled,
  ...rest
}: Props): ReactElement => {
  let ariaProps = {};
  if (disabled) {
    ariaProps = {
      'aria-disabled': true,
    };
  }
  return (
    <FCThemeConsumer>
      {(themeContext): ReactNode => (
        <ToggleWrapper
          id={id}
          active={active}
          theme={themeContext.theme}
          role="checkbox"
          aria-checked={active}
          onClick={(e: unknown): void => {
            if (!disabled) {
              onClick(e);
            }
          }}
          disabled={disabled}
          onKeyDown={(e: any): void => {
            if (e.key === 'Enter' || e.key === ' ') {
              if (!disabled) {
                e.preventDefault();
                onClick(e);
              }
            }
          }}
          tabIndex={disabled ? -1 : 0}
          {...ariaProps}
          {...rest}
        >
          <Slider disabled={disabled} theme={themeContext.theme} active={active} />
          {showLabels && (
            <>
              <ToggleLabel disabled={disabled} active={active} theme={themeContext.theme}>
                {active ? 'On' : 'Off'}
              </ToggleLabel>
            </>
          )}
        </ToggleWrapper>
      )}
    </FCThemeConsumer>
  );
};

export default Toggle;
