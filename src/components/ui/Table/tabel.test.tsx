import React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-styled-components';
import { Table } from './index';
import { color } from '../../../styles/styles';
import { FCThemeProvider } from '../../../theming/FCTheme';

afterEach(cleanup);

describe('Table Tests', () => {
  test('Renders the Table component', () => {
    const { getByText } = render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Cell>First Name</Table.Cell>
            <Table.Cell>Last Name</Table.Cell>
            <Table.Cell>Job</Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Clark</Table.Cell>
            <Table.Cell>Kent</Table.Cell>
            <Table.Cell>Superman</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>,
    );
    expect(getByText('Clark')).toBeInTheDocument();
    expect(getByText('First Name')).toBeInTheDocument();
  });

  test('Renders correct styles in dark mode', () => {
    const { container } = render(
      <FCThemeProvider value={{ theme: 'dark' }}>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Cell>First Name</Table.Cell>
              <Table.Cell>Last Name</Table.Cell>
              <Table.Cell>Job</Table.Cell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Clark</Table.Cell>
              <Table.Cell>Kent</Table.Cell>
              <Table.Cell>Superman</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </FCThemeProvider>,
    );
    expect(container).toMatchSnapshot();
  });
  test('Setting  the table header to have no border removes the border', () => {
    const { getByText } = render(
      <Table data-testid="table">
        <Table.Header showBottomBorder={false}>
          <Table.Row>
            <Table.Cell>First Name</Table.Cell>
            <Table.Cell>Last Name</Table.Cell>
            <Table.Cell>Job</Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Clark</Table.Cell>
            <Table.Cell>Kent</Table.Cell>
            <Table.Cell>Superman</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>,
    );
    expect(getByText('First Name').parentNode?.parentNode).toHaveStyleRule('border-bottom', undefined);
  });

  test('Setting table to have a padding changes the padding in the styles', () => {
    const { getByTestId } = render(
      <Table padding="10px" data-testid="table">
        <Table.Header showBottomBorder={false}>
          <Table.Row>
            <Table.Cell data-testid="table-cell">First Name</Table.Cell>
            <Table.Cell>Last Name</Table.Cell>
            <Table.Cell>Job</Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Clark</Table.Cell>
            <Table.Cell>Kent</Table.Cell>
            <Table.Cell>Superman</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>,
    );
    expect(getByTestId('table-cell')).toHaveStyleRule('padding', '10px');
  });

  test('Setting table to have zebra striping adds the zebra stripe color', () => {
    const { getByTestId } = render(
      <Table padding="10px" zebraStripeColor="tomato" zebraStriping data-testid="table">
        <Table.Header showBottomBorder={false}>
          <Table.Row>
            <Table.Cell data-testid="table-cell">First Name</Table.Cell>
            <Table.Cell>Last Name</Table.Cell>
            <Table.Cell>Job</Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Clark</Table.Cell>
            <Table.Cell>Kent</Table.Cell>
            <Table.Cell>Superman</Table.Cell>
          </Table.Row>
          <Table.Row data-testid="alt-row">
            <Table.Cell>Clark</Table.Cell>
            <Table.Cell>Kent</Table.Cell>
            <Table.Cell>Superman</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Clark</Table.Cell>
            <Table.Cell>Kent</Table.Cell>
            <Table.Cell>Superman</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>,
    );
    expect(getByTestId('alt-row')).toHaveStyleRule('background-color', 'tomato', {
      modifier: ':nth-child(even)',
    });
  });
  test('First column freezes', () => {
    const { getByTestId } = render(
      <Table freezeFirstColumn padding="10px" data-testid="table">
        <Table.Header data-testid="table-header" showBottomBorder={false}>
          <Table.Row>
            <Table.Cell data-testid="table-cell">First Name</Table.Cell>
            <Table.Cell>Last Name</Table.Cell>
            <Table.Cell>Job</Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Clark</Table.Cell>
            <Table.Cell>Kent</Table.Cell>
            <Table.Cell>Superman</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>,
    );
    expect(getByTestId('table-cell')).toHaveStyleRule('position', 'absolute', { modifier: ':first-child' });
  });
  test('Highlight color shows on hover', () => {
    const { getByTestId } = render(
      <Table highlightOnHover data-testid="table">
        <Table.Header data-testid="table-header" showBottomBorder={false}>
          <Table.Row>
            <Table.Cell data-testid="table-cell">First Name</Table.Cell>
            <Table.Cell>Last Name</Table.Cell>
            <Table.Cell>Job</Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body data-testid="table-body">
          <Table.Row data-testid="table-row">
            <Table.Cell>Clark</Table.Cell>
            <Table.Cell>Kent</Table.Cell>
            <Table.Cell>Superman</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>,
    );
    expect(getByTestId('table-body')).toHaveStyleRule('background-color', color.highlight, { modifier: 'tr:hover' });
  });
  test('Highlight color shows on hover | Dark mode', () => {
    const { getByTestId } = render(
      <FCThemeProvider value={{ theme: 'dark' }}>
        <Table highlightOnHover data-testid="table">
          <Table.Header data-testid="table-header" showBottomBorder={false}>
            <Table.Row>
              <Table.Cell data-testid="table-cell">First Name</Table.Cell>
              <Table.Cell>Last Name</Table.Cell>
              <Table.Cell>Job</Table.Cell>
            </Table.Row>
          </Table.Header>
          <Table.Body data-testid="table-body">
            <Table.Row data-testid="table-row">
              <Table.Cell>Clark</Table.Cell>
              <Table.Cell>Kent</Table.Cell>
              <Table.Cell>Superman</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </FCThemeProvider>,
    );
    expect(getByTestId('table-body')).toHaveStyleRule('background-color', color.darkModeMedium, {
      modifier: 'tr:hover',
    });
  });
});
