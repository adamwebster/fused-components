import React from 'react';

import { Meta } from '@storybook/react';

import { Button } from './src/';

export default {
  component: Button,
  title: 'Components/Button',
} as Meta;

export const Primary: React.VFC<{}> = args => <Button {...args}>Button</Button>;

export const Disabled: React.VFC<{}> = args => (
  <>
    <Button disabled {...args}>
      Button
    </Button>
  </>
);
