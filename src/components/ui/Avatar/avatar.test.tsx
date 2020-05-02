import React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-styled-components';
import { Avatar } from './index';

afterEach(cleanup);

describe('Avatar Tests', () => {
  test('Renders the component', () => {
    render(<Avatar />);
  });
  test('Changing the size to medium has the correct size', () => {
    const { container } = render(<Avatar size="medium" />);
    expect(container).toMatchSnapshot();
  });
  test('Changing the size to tiny has the correct size', () => {
    const { container } = render(<Avatar size="tiny" />);
    expect(container).toMatchSnapshot();
  });
  test('Changing the size to large has the correct size', () => {
    const { container } = render(<Avatar size="large" />);
    expect(container).toMatchSnapshot();
  });
  test('Adding the box shadow prop matches the snapshot', () => {
    const { container } = render(<Avatar boxShadow />);
    expect(container).toMatchSnapshot();
  });
  test('Setting the border radius to square matches the snapshot', () => {
    const { container } = render(<Avatar borderRadius="square" />);
    expect(container).toMatchSnapshot();
  });
  test('Setting the border radius to round matches the snapshot', () => {
    const { container } = render(<Avatar borderRadius="round" />);
    expect(container).toMatchSnapshot();
  });
  test('Adding an image passes the url to the css', () => {
    const { container } = render(<Avatar image="http://localhost/TestImage.jpg" />);
    expect(container).toMatchSnapshot();
  });
});
