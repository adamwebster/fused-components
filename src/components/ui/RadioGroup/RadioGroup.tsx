import React, { ReactNode, ReactElement, useState, useEffect } from 'react';
import { Radio } from '../Radio';
import { RadioWrapper } from './style';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * @ignore
   */
  children: ReactNode;
  /** What happens when the radio that is selected changes.  Passes back the value of the radio */
  onRadioChanged?: (value: string) => void;
  /** If the inputs should be displayed inline or not */
  inline?: boolean;
  /** The value of the radio that is selected in the radio group. */
  selectedValue?: string;
}

export const RadioGroup = ({
  children,
  onRadioChanged = (): void => undefined,
  inline,
  selectedValue,
  ...rest
}: Props): ReactElement => {
  const [radioItems, setRadioItems] = useState<Array<any>>([]);
  const [checkedItem, setCheckedItem] = useState(0);
  const radioRefs: any = [];

  const increaseSelectedIndex = (e: any): void => {
    e.preventDefault();
    if (checkedItem + 1 !== radioRefs.length) {
      setCheckedItem(checkedItem + 1);
      radioRefs[checkedItem + 1].focus();
      onRadioChanged(radioItems[checkedItem + 1].props.value);
    } else {
      setCheckedItem(0);
      radioRefs[0].focus();
      onRadioChanged(radioItems[0].props.value);
    }
  };

  const decreaseSelectedIndex = (e: any): void => {
    e.preventDefault();
    if (checkedItem !== 0) {
      setCheckedItem(checkedItem - 1);
      radioRefs[checkedItem - 1].focus();
      onRadioChanged(radioItems[checkedItem - 1].props.value);
    } else {
      setCheckedItem(radioRefs.length - 1);
      radioRefs[radioRefs.length - 1].focus();
      onRadioChanged(radioItems[radioRefs.length - 1].props.value);
    }
  };

  const handleKeyDown = (e: any, index: number): void => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      increaseSelectedIndex(e);
    }
    if (e.key === 'ArrowLeft' || e.key == 'ArrowUp') {
      decreaseSelectedIndex(e);
    }
    if (e.key === ' ') {
      e.preventDefault();
      setCheckedItem(index);
      onRadioChanged(radioItems[index].props.value);
    }
  };

  useEffect(() => {
    const ArrayToSave: any = [];
    React.Children.map(children, (child: any, index: number): void => {
      if (child.type === Radio) {
        ArrayToSave.push(child);
      }
      if (child.props.value === selectedValue) {
        setCheckedItem(index);
      }
    });
    setRadioItems(ArrayToSave);
  }, [children]);

  return (
    <>
      {radioItems.map((radio: any, index) => {
        return (
          <RadioWrapper inline={inline} key={radio.props.id} {...rest}>
            <Radio
              onKeyDown={(e: any): void => handleKeyDown(e, index)}
              checked={checkedItem === index || false}
              id={radio.props.key || radio.props.id}
              ref={(ref: any): void => radioRefs.push(ref)}
              value={radio.props.value}
              radioTabIndex={0}
              onClick={(): void => {
                onRadioChanged(radio.props.value);
                setCheckedItem(index);
                radioRefs[index].focus();
              }}
            >
              {radio.props.children}
            </Radio>
          </RadioWrapper>
        );
      })}
    </>
  );
};

export default RadioGroup;
