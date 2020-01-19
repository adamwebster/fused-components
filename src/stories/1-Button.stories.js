import React from "react";
import { action } from "@storybook/addon-actions";
import { Button } from "@storybook/react/demo";
import AnimatedButton from "../components/ui/AnimatedButton/";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";

export default {
  title: "Button",
  component: AnimatedButton,
  decorators: [withKnobs],
  parameters: {
    component: AnimatedButton,
    componentSubtitle:
      "Displays an image that represents a user or organization"
  }
};

export const ButtonThatIsAnimated = () => (
  <AnimatedButton
    onClick={action("button action click")}
    disabled={boolean("Disabled", false)}
    primary={boolean("Primary", false)}
    loading={boolean("Loading", false)}
    completed={boolean("Completed", false)}
  >
    Hello Button
  </AnimatedButton>
);
