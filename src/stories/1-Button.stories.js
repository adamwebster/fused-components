import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import AnimatedButton from '../components/ui/AnimatedButton';
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";

export default {
  title: 'Button',
  component: Button,
  decorators: [withKnobs]
};

export const ButtonThatIsAnimated = () => <AnimatedButton disabled={boolean("Disabled", false)} loading={boolean("Loading", false)} completed={boolean("Completed", false)}>Hello Button</AnimatedButton>;

