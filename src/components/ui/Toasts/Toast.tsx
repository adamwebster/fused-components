import React, { useState, useEffect, useCallback } from 'react';
import { StyledToast, LoadingBar, CloseButton } from './styles';
import { Icon } from '../../icon';
import { fcStyles } from '../../../common/types';

export interface Props {
  /** The title of the toast item */
  title?: string;
  /** The style for the toast */
  style?: fcStyles;
  children?: any;
  /** The icon for the toast */
  icon?: string;
  /** how long the toast should be shown in seconds */
  duration?: number;
  theme?: any;
}
export const Toast = ({ title, style, children, icon, duration = 4, theme }: Props) => {
  const [visible, setVisible] = useState(true);
  const [removing, setRemoving] = useState(false);
  const [timer, setTimer] = useState('0');
  const [intervalFunc, setIntervalFunc] = useState(0);

  const startTimer = useCallback(
    countNumber => {
      let count = countNumber;

      function timer() {
        count--;

        let countNumber = (count / 100).toString().slice(2);
        if (countNumber.length === 1) {
          countNumber = countNumber + '0';
        }
        if (countNumber.length === 0) {
          countNumber = '0';
        }
        if (countNumber === '0') {
          setRemoving(true);
          setTimeout(() => setVisible(false), 400);
        }
        setTimer(countNumber);
      }

      const counter = setInterval(timer, duration * 10); //10 will  run it every 100th of a second

      if (count <= 0) {
        clearInterval(counter);
        return;
      }

      setIntervalFunc(counter);
    },
    [duration],
  );

  useEffect(() => {
    startTimer(100);
  }, [startTimer]);

  const mouseOverToast = () => {
    clearInterval(intervalFunc);
    const time = timer;
    setTimer(time);
  };

  const mouseOutToast = () => {
    startTimer(timer);
  };

  return (
    <>
      {visible && (
        <StyledToast
          timer={timer}
          onMouseOver={() => mouseOverToast()}
          onMouseOut={() => mouseOutToast()}
          removing={removing}
          fcStyle={style}
          icon={icon}
          title={title}
          theme={theme}
        >
          {children && (
            <span
              dangerouslySetInnerHTML={{
                __html: children,
              }}
            />
          )}
          <CloseButton
            theme={theme}
            onClick={() => {
              setRemoving(true);
              setTimeout(() => setVisible(false), 500);
            }}
          >
            <Icon icon="times" />
          </CloseButton>
          <LoadingBar theme={theme} timer={timer} />
        </StyledToast>
      )}
    </>
  );
};
