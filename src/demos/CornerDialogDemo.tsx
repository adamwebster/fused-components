import React, { useState } from "react";
import { CornerDialog } from "../components/ui/CornerDialog";
import { Button } from "../components/ui/Button";
import { Label } from "../components/ui/Label";
import { fcStyles } from "../common/types";
import { Textarea } from "../components/ui/Textarea";
import { FCThemeProvider } from "../theming/FCTheme";

export const CornerDialogDemo = () => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [style, setStyle] = useState("danger" as fcStyles);
  const [theme, setTheme] = useState("light");
  const [icon, setIcon] = useState("no-entry-circle");
  return (
    <>
      <Label htmlFor="darkmode">Theme</Label>

      <select
        id="darkmode"
        onChange={e => {
          setTheme(e.target.value);
        }}
      >
        <option data-icon="no-entry-circle" value="light">
          light
        </option>
        <option data-icon="exclamation-circle" value="dark">
          dark
        </option>
      </select>
      <p>
        <Label htmlFor="styleoption">Choose an option: </Label>
        <select
          id="styleoption"
          onChange={e => {
            setStyle(e.target.value as fcStyles);
            setIcon(
              e.target.selectedOptions[0].getAttribute("data-icon") as string
            );
          }}
        >
          <option data-icon="no-entry-circle" value="danger">
            Danger
          </option>
          <option data-icon="exclamation-circle" value="warning">
            Warning
          </option>
          <option data-icon="question-circle" value="info">
            Info
          </option>
          <option data-icon="check-circle" value="success">
            Success
          </option>
          <option data-icon="info-circle" value="">
            None
          </option>
        </select>
      </p>

      <Button onClick={() => setDialogVisible(true)} disabled={dialogVisible}>
        Show Corner Dialog
      </Button>
      <FCThemeProvider value={{theme}}>
        <CornerDialog
          fcStyle={style as fcStyles}
          icon={icon}
          onCloseClick={() => setDialogVisible(false)}
          visible={dialogVisible}
          title="Corner Dialog"
          confirmText="Yes"
          cancelText="Close me"
        >
          Click the close button above or below to hide the corner dialog.
        </CornerDialog>
      </FCThemeProvider>
    </>
  );
};
