import React, { useState } from "react";
import { CornerDialog } from "../components/ui/CornerDialog";

export const CornerDialogDemo = () => {
  const [dialogVisible, setDialogVisible] = useState(true);
  return (
    <CornerDialog
      onCloseClick={() => setDialogVisible(false)}
      visible={dialogVisible}
      title="Corner Dialog"
    >
      Click the close button above or below to hide the corner dialog.
    </CornerDialog>
  );
};
