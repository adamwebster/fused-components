/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useToast, ToastProvider } from "../components/ui/Toasts/ToastProvider";
import { Button } from "../components/ui/Button";

const ToastLoad = () => {
  const toasts = useToast();

  useEffect(() => {
    setTimeout(() => {
      toasts.addInfo('test');
    }, 1000)

    setTimeout(() => {
      toasts.addInfo('test2');
    }, 3000)

  }, [])

  return true;
}

const Toaster = () => {
  const toasts = useToast();

  return (
    <>
      <ToastLoad />
      <Button
        onClick={() => {
          toasts.addInfo(
            "Did you know?",
            "That space smells like seared steak."
          );
        }}
      >
        Info Toast
      </Button>
      <br /> <br />
      <Button
        onClick={() => {
          toasts.addSuccess("Hooray!", "Something went right for once...", {
            duration: 10
          });
        }}
      >
        Success Toast (Duration set to 10sec)
      </Button>
      <br /> <br />
      <Button
        onClick={() => {
          toasts.addWarning("Warning", "Winter is coming.", { id: "one" });
        }}
      >
        Warning Toast (Maximum 1)
      </Button>
      <br /> <br />
      <Button
        onClick={() => {
          toasts.addDanger("Ok fly boy", "Highway to the danger zone");
        }}
      >
        Danger Toast
      </Button>
      <br /> <br />
      <Button
        onClick={() => {
          toasts.addDanger("Danger Will Robinson");
        }}
      >
        Danger Toast No Content
      </Button>
    </>
  );
};
export const ToastDemo = () => {
  const [position, setPosition] = useState("top");

  return (
    <ToastProvider position={position}>
      <label>Position</label>
      <select onChange={e => setPosition(e.target.value)}>
        <option value="top">top</option>
        <option value="bottom">bottom</option>
        <option value="bottom-left">top-right</option>
        <option value="bottom-right">bottom-right</option>
      </select>
      <br />
      <br />
      <Toaster />
    </ToastProvider>
  );
};
