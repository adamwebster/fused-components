import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import AnimatedButton from '../components/ui/AnimatedButton';
export default {
  title: 'Button',
  component: Button,
};

export const ButtonThatIsAnimated = () => <AnimatedButton completed>Hello Button</AnimatedButton>;

