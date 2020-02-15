import React, { useState } from "react";
import { CornerDialog } from "../components/ui/CornerDialog";
import { Button } from "../components/ui/Button";

export const CornerDialogDemo = () => {
  const [dialogVisible, setDialogVisible] = useState(false);
  return (
      <>
      <Button onClick={() => setDialogVisible(true)} disabled={dialogVisible}>Show Corner Dialog</Button>
    <CornerDialog
      onCloseClick={() => setDialogVisible(false)}
      visible={dialogVisible}
      title="Corner Dialog"
    >
      Click the close button above or below to hide the corner dialog.
    </CornerDialog>
    </>
  );
};
