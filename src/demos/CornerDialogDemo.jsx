import React, { useState } from "react";
import { CornerDialog } from "../components/ui/CornerDialog";
import { Button } from "../components/ui/Button";
import Icon from '../components/icon/';
import { Label } from '../components/ui/Label/';

export const CornerDialogDemo = () => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [style, setStyle] = useState('danger');
  const [icon, setIcon] = useState('no-entry-circle');
  return (
    <>
    <p>
    <Label htmlFor="styleoption">Choose an option: </Label>
    <select id="styleoption" onChange={(e) => {setStyle(e.target.value); setIcon(e.target.selectedOptions[0].getAttribute('data-icon'))}}>
        <option data-icon="no-entry-circle" value="danger">Danger</option>
        <option data-icon="exclamation-circle" value="warning">Warning</option>
        <option  data-icon="question-circle" value="info">Info</option>
        <option  data-icon="check-circle" value="success">Success</option>
        <option data-icon="info-circle" value="">None</option>

    </select>
    </p>

      <Button onClick={() => setDialogVisible(true)} disabled={dialogVisible}>
        Show Corner Dialog
      </Button>
      <CornerDialog
        fcStyle={style}
        icon={<Icon icon={icon} />}
        onCloseClick={() => setDialogVisible(false)}
        visible={dialogVisible}
        title="Corner Dialog"
      >
        Click the close button above or below to hide the corner dialog.
      </CornerDialog>
    </>
  );
};
