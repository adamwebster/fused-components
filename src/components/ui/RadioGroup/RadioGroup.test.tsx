import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import 'jest-styled-components';
import { Radio } from '../Radio/index';
import RadioGroup from './RadioGroup';
import userEvent from '@testing-library/user-event';

describe('Radio Group Test', () => {
  test('Renders the radio group component', () => {
    const { container } = render(
      <RadioGroup>
        <Radio id="1" value="Radio 1">
          Radio 1
        </Radio>
        <Radio id="2" value="Radio 2">
          Radio 2
        </Radio>
        <Radio id="3" value="Radio 3">
          Radio 3
        </Radio>
      </RadioGroup>,
    );
    expect(container).toMatchSnapshot();
  });

  test('Renders the radio group component inline', () => {
    const { container } = render(
      <RadioGroup inline>
        <Radio id="1" value="Radio 1">
          Radio 1
        </Radio>
        <Radio id="2" value="Radio 2">
          Radio 2
        </Radio>
        <Radio id="3" value="Radio 3">
          Radio 3
        </Radio>
      </RadioGroup>,
    );
    expect(container).toMatchSnapshot();
  });
  test('Clicking on a radio changes the value', () => {
    let value = 'Hello';

    const onChange = jest.fn(rv => {
      value = rv;
    });
    render(
      <RadioGroup onChange={value => onChange(value)}>
        <Radio id="1" value="Radio 1">
          Radio 1
        </Radio>
        <Radio id="2" value="Radio 2">
          Radio 2
        </Radio>
        <Radio id="3" value="Radio 3">
          Radio 3
        </Radio>
      </RadioGroup>,
    );
    const secondRadio = screen.getByText('Radio 2');
    userEvent.click(secondRadio);
    expect(value).toBe('Radio 2');
  });

  test('Clicking down when a radio is focused changes the value', () => {
    let value = 'Hello';

    const onChange = jest.fn(rv => {
      value = rv;
    });
    render(
      <RadioGroup onChange={value => onChange(value)}>
        <Radio id="1" value="Radio 1">
          Radio 1
        </Radio>
        <Radio id="2" value="Radio 2">
          Radio 2
        </Radio>
        <Radio id="3" value="Radio 3">
          Radio 3
        </Radio>
      </RadioGroup>,
    );
    userEvent.tab();
    const firstRadio = screen.getAllByRole('radio')[1];
    expect(firstRadio).toHaveFocus();
    fireEvent.keyDown(firstRadio, { key: 'ArrowDown' });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(value).toBe('Radio 2');
  });

  test('Clicking right when a radio is focused changes the value', () => {
    let value = 'Hello';

    const onChange = jest.fn(rv => {
      value = rv;
    });
    render(
      <RadioGroup onChange={value => onChange(value)}>
        <Radio id="1" value="Radio 1">
          Radio 1
        </Radio>
        <Radio id="2" value="Radio 2">
          Radio 2
        </Radio>
        <Radio id="3" value="Radio 3">
          Radio 3
        </Radio>
      </RadioGroup>,
    );
    userEvent.tab();
    const firstRadio = screen.getAllByRole('radio')[1];
    expect(firstRadio).toHaveFocus();
    fireEvent.keyDown(firstRadio, { key: 'ArrowRight' });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(value).toBe('Radio 2');
  });

  test('Clicking up when a radio is focused changes the value', () => {
    let value = 'Hello';

    const onChange = jest.fn(rv => {
      value = rv;
    });
    render(
      <RadioGroup onChange={value => onChange(value)}>
        <Radio id="1" value="Radio 1">
          Radio 1
        </Radio>
        <Radio id="2" value="Radio 2">
          Radio 2
        </Radio>
        <Radio id="3" value="Radio 3">
          Radio 3
        </Radio>
      </RadioGroup>,
    );
    userEvent.tab();
    const firstRadio = screen.getAllByRole('radio')[1];
    expect(firstRadio).toHaveFocus();
    fireEvent.keyDown(firstRadio, { key: 'ArrowDown' });
    fireEvent.keyDown(firstRadio, { key: 'ArrowUp' });

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(value).toBe('Radio 1');
  });

  test('Clicking left when a radio is focused changes the value', () => {
    let value = 'Hello';

    const onChange = jest.fn(rv => {
      value = rv;
    });
    render(
      <RadioGroup onChange={value => onChange(value)}>
        <Radio id="1" value="Radio 1">
          Radio 1
        </Radio>
        <Radio id="2" value="Radio 2">
          Radio 2
        </Radio>
        <Radio id="3" value="Radio 3">
          Radio 3
        </Radio>
      </RadioGroup>,
    );
    userEvent.tab();
    const firstRadio = screen.getAllByRole('radio')[1];
    expect(firstRadio).toHaveFocus();
    fireEvent.keyDown(firstRadio, { key: 'ArrowRight' });
    fireEvent.keyDown(firstRadio, { key: 'ArrowLeft' });

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(value).toBe('Radio 1');
  });

  test('Clicking space on a focused radio changes the value', () => {
    let value = 'Hello';

    const onChange = jest.fn(rv => {
      value = rv;
    });
    render(
      <RadioGroup onChange={value => onChange(value)}>
        <Radio id="1" value="Radio 1">
          Radio 1
        </Radio>
        <Radio id="2" value="Radio 2">
          Radio 2
        </Radio>
        <Radio id="3" value="Radio 3">
          Radio 3
        </Radio>
      </RadioGroup>,
    );
    const secondRadio = screen.getAllByRole('radio')[3];
    secondRadio.focus();
    expect(secondRadio).toHaveFocus();
    fireEvent.keyDown(secondRadio, { key: ' ' });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(value).toBe('Radio 2');
  });

  test('Clicking down when the last radio is focused sets the value to the first radios value', () => {
    let value = 'Hello';

    const onChange = jest.fn(rv => {
      value = rv;
    });
    render(
      <RadioGroup onChange={value => onChange(value)}>
        <Radio id="1" value="Radio 1">
          Radio 1
        </Radio>
        <Radio id="2" value="Radio 2">
          Radio 2
        </Radio>
        <Radio id="3" value="Radio 3">
          Radio 3
        </Radio>
      </RadioGroup>,
    );
    const lastRadio = screen.getAllByRole('radio')[5];
    lastRadio.focus();
    fireEvent.keyDown(lastRadio, { key: ' ' });
    expect(lastRadio).toHaveFocus();
    fireEvent.keyDown(lastRadio, { key: 'ArrowDown' });

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(value).toBe('Radio 1');
  });

  test('Clicking up when the first radio is focused sets the value to the last radios value', () => {
    let value = 'Hello';

    const onChange = jest.fn(rv => {
      value = rv;
    });
    render(
      <RadioGroup onChange={value => onChange(value)}>
        <Radio id="1" value="Radio 1">
          Radio 1
        </Radio>
        <Radio id="2" value="Radio 2">
          Radio 2
        </Radio>
        <Radio id="3" value="Radio 3">
          Radio 3
        </Radio>
      </RadioGroup>,
    );
    const lastRadio = screen.getAllByRole('radio')[1];
    lastRadio.focus();
    fireEvent.keyDown(lastRadio, { key: ' ' });
    expect(lastRadio).toHaveFocus();
    fireEvent.keyDown(lastRadio, { key: 'ArrowUp' });

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(value).toBe('Radio 3');
  });

  test('Setting the value of the radio group changes the selected radio', () => {
    render(
      <RadioGroup selectedValue="Radio 2">
        <Radio id="1" value="Radio 1">
          Radio 1
        </Radio>
        <Radio id="2" value="Radio 2">
          Radio 2
        </Radio>
        <Radio id="3" value="Radio 3">
          Radio 3
        </Radio>
      </RadioGroup>,
    );
    const secondRadio = screen.getAllByRole('radio')[3];
    expect(secondRadio.getAttribute('aria-checked')).toBe('true');
  });
});
