import React, { useState } from "react";
import { Dialog } from "../components/ui/Dialog";
import { Button } from "../components/ui/Button";
import { Label } from "../components/ui/Label";
import { Input } from "../components/ui/Input";

export const DialogDemo = () => {
  const [dialogVisible, setDialogVisible] = useState(false);

  return (
    <>
      <Button onClick={() => setDialogVisible(true)} disabled={dialogVisible}>
        Show Dialog
      </Button>
      <Dialog
        onCloseClick={() => setDialogVisible(false)}
        visible={dialogVisible}
        title="Dialog"
      >
        <Label htmlFor="user">Username</Label>
        <Input id="user" icon="user"/>
        <Label htmlFor="Password">Password</Label>
        <Input id="Password" type="password" icon="lock-locked" />
      
      </Dialog>
    </>
  );
};
