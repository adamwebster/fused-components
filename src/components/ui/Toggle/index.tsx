import React, { ReactElement, ReactNode } from 'react';
import { ToggleWrapper, Slider, ToggleLabel } from './style';
import { FCThemeConsumer } from '../../../theming/FCTheme';

export interface Props {
  /** If the toggle is active or not */
  active?: boolean;
  /** Display the on and off labels */
  showLabels?: boolean;
  /** What should happen when the toggle is clicked */
  onClick?: (e: unknown) => void;
}
export const Toggle = ({
  active = false,
  showLabels = false,
  onClick = (): void => undefined,
  ...rest
}: Props): ReactElement => {
  return (
    <FCThemeConsumer>
      {(themeContext): ReactNode => (
        <ToggleWrapper
          active={active}
          theme={themeContext.theme}
          role="checkbox"
          aria-checked={active}
          onClick={(e: unknown): void => {
            onClick(e);
          }}
          onKeyDown={(e: any): void => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onClick(e);
            }
          }}
          tabIndex={0}
          {...rest}
        >
          <Slider theme={themeContext.theme} active={active} />
          {showLabels && (
            <>
              <ToggleLabel active={active} theme={themeContext.theme}>
                {active ? 'On' : 'Off'}
              </ToggleLabel>
            </>
          )}
        </ToggleWrapper>
      )}
    </FCThemeConsumer>
  );
};
