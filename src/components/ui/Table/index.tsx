import React, { ReactNode, useContext, ReactElement } from 'react';
import { StyledTable } from './style';

import { TableContextProvider } from './TableContext';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import TableBody from './TableBody';
import TableCell from './TableCell';
import { FCTheme } from '../../../theming/FCTheme';
import { color } from '../../../styles/styles';

export interface Props {
  /** Set the padding for the table */
  padding?: string;
  /** Set if the table has zebra Striping */
  zebraStriping?: boolean;
  /** Set the zebra stripe color */
  zebraStripeColor?: string;
  /** If the first column should be frozen */
  freezeFirstColumn?: boolean;
  /** The width of the first column */
  frozenColumnWidth?: string;
  /** Frozen column background color */
  highlightOnHover?: boolean;
  children: ReactNode;
}

export const Table = ({
  padding = '5px',
  zebraStriping = false,
  zebraStripeColor,
  freezeFirstColumn = false,
  children,
  frozenColumnWidth,
  highlightOnHover = false,
  ...rest
}: Props): ReactElement => {
  const themeContext = useContext(FCTheme);

  const zebraStripeColorValue =
    themeContext.theme === 'dark' ? color.darkModeDark : zebraStripeColor ? zebraStripeColor : '#ebebeb';

  const state = {
    padding,
    freezeFirstColumn,
    zebraStriping,
    zebraStripeColor: zebraStripeColorValue,
    frozenColumnWidth,
    theme: themeContext.theme,
    highlightOnHover,
  };
  return (
    <>
      <StyledTable theme={themeContext.theme} {...rest}>
        <TableContextProvider value={state}>{children}</TableContextProvider>
      </StyledTable>
    </>
  );
};

Table.Header = TableHeader;
Table.Row = TableRow;
Table.Cell = TableCell;
Table.Body = TableBody;
