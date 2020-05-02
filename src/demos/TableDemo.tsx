import React from 'react';
import { FCThemeProvider } from '../theming/FCTheme';
import { Table } from '../components/ui/Table';
import { DarkModeWrapper } from '../common/styles';

export const TableDark = () => {
  return (
    <FCThemeProvider value={{ theme: 'dark' }}>
      <DarkModeWrapper>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Cell>Cell 1 Header</Table.Cell>
              <Table.Cell>Cell 2 Header</Table.Cell>
              <Table.Cell>Cell 3 Header</Table.Cell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>Row 1 Cell 1</Table.Cell>
              <Table.Cell>Row 1 Cell 2</Table.Cell>
              <Table.Cell>Row 1 Cell 3</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Row 2 Cell 1</Table.Cell>
              <Table.Cell>Row 2 Cell 2</Table.Cell>
              <Table.Cell>Row 2 Cell 3</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Row 3 Cell 1</Table.Cell>
              <Table.Cell>Row 3 Cell 2</Table.Cell>
              <Table.Cell>Row 3 Cell 3</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

        <br />

        <Table zebraStriping>
          <Table.Header>
            <Table.Row>
              <Table.Cell>Cell 1 Header</Table.Cell>
              <Table.Cell>Cell 2 Header</Table.Cell>
              <Table.Cell>Cell 3 Header</Table.Cell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>Row 1 Cell 1</Table.Cell>
              <Table.Cell>Row 1 Cell 2</Table.Cell>
              <Table.Cell>Row 1 Cell 3</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Row 2 Cell 1</Table.Cell>
              <Table.Cell>Row 2 Cell 2</Table.Cell>
              <Table.Cell>Row 2 Cell 3</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Row 3 Cell 1</Table.Cell>
              <Table.Cell>Row 3 Cell 2</Table.Cell>
              <Table.Cell>Row 3 Cell 3</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </DarkModeWrapper>
    </FCThemeProvider>
  );
};
