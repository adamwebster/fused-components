import React, { useState, useEffect } from "react";
import { StyledToast, LoadingBar } from "./styles";

export const Toast = ({ title, fcStyle, children }) => {
  const [visible, setVisible] = useState(true);
  const [removing, setRemoving] = useState(false);
  const [timer, setTimer] =useState(null);
  const [intervalFunc, setIntervalFunc] =useState(null);
  useEffect(() => {
    startTimer(100);
  }, [])

 const startTimer = (countNumber) => {
  var count = countNumber;
    
  var counter = setInterval(timer, 40); //10 will  run it every 100th of a second
  setIntervalFunc(counter);
  function timer()
  {
      if (count <= 0)
      {
          clearInterval(counter);
          return;
       }
       count--;

       let countNumber = (count /100).toString().slice(2);
       if(countNumber.length === 1)
       {
         countNumber = countNumber + '0';
       }
       if(countNumber.length === 0){
         countNumber = 0;
       }
       if(countNumber === 0){
         setRemoving(true)
         setTimeout(() => setVisible(false), 500)
       }
       setTimer(countNumber)
   }
  }

  const mouseOverToast = () => {
    clearInterval(intervalFunc);
    const time = timer;
    setTimer(time);
  }

  const mouseOutToast = () => {
    startTimer(timer);
  }

  return (
    <>
      {visible && (
        <StyledToast timer={timer} onMouseOver={() => mouseOverToast()} onMouseOut={() => mouseOutToast()} removing={removing} fcStyle={fcStyle} title={title}>
          {children}
          <LoadingBar timer={timer} /> 
        </StyledToast>
      )}
    </>
  );
};
