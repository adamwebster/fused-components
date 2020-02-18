import React, { useState, useEffect, useCallback } from "react";
import PropTypes from 'prop-types';
import { StyledToast, LoadingBar, CloseButton } from "./styles";
import { Icon } from '../../icon/'

export const Toast = ({ title, fcStyle, children, icon, duration }) => {
  const [visible, setVisible] = useState(true);
  const [removing, setRemoving] = useState(false);
  const [timer, setTimer] =useState(null);
  const [intervalFunc, setIntervalFunc] =useState(null);
  
 const startTimer = useCallback((countNumber) => {
  var count = countNumber;
    
  var counter = setInterval(timer, duration * 10); //10 will  run it every 100th of a second
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
  },[duration])

  useEffect(() => {
    startTimer(100);
  }, [startTimer])

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
        <StyledToast timer={timer} onMouseOver={() => mouseOverToast()} onMouseOut={() => mouseOutToast()} removing={removing} fcStyle={fcStyle} icon={icon} title={title}>
          {children}
          <CloseButton onClick={() => { setRemoving(true); setTimeout(() => setVisible(false), 500) }}>
            <Icon icon="times" />
          </CloseButton>

          <LoadingBar timer={timer} /> 
        </StyledToast>
      )}
    </>
  );
};

Toast.propTypes = {
  duration: PropTypes.number,
}

Toast.defaultProps = {
  duration: 4,
}