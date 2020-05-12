import React, { ReactNode, ReactElement, useState, useEffect } from 'react';
import { Radio } from '../Radio';
import { RadioWrapper } from './style';
interface Props {
  children: ReactNode;
  onChange?: (value: string) => void;
  inline?: boolean;
}

const RadioGroup = ({ children, onChange = (): void => undefined, inline }: Props): ReactElement => {
  const [radioItems, setRadioItems] = useState<Array<any> | null>(null);
  const [checkedItem, setCheckedItem] = useState(0);
  const radioRefs: any = [];

  const increaseSelectedIndex = (e: any): void => {
    e.preventDefault();
    if (checkedItem + 1 !== radioRefs.length) {
      setCheckedItem(checkedItem + 1);
      if (radioItems) {
        radioRefs[checkedItem + 1].focus();
        onChange(radioItems[checkedItem + 1].props.value);
      }
    }
  };

  const decreaseSelectedIndex = (e: any): void => {
    e.preventDefault();
    if (checkedItem !== 0) {
      setCheckedItem(checkedItem - 1);
      if (radioItems) {
        radioRefs[checkedItem - 1].focus();
        onChange(radioItems[checkedItem - 1].props.value);
      }
    }
  };

  const handleKeyDown = (e: any, index: number): void => {
    if (inline) {
      if (e.key === 'ArrowRight') {
        increaseSelectedIndex(e);
      }
      if (e.key === 'ArrowLeft') {
        decreaseSelectedIndex(e);
      }
    } else {
      if (e.key === 'ArrowDown') {
        increaseSelectedIndex(e);
      }
      if (e.key === 'ArrowUp') {
        decreaseSelectedIndex(e);
      }
    }
    if (e.key === ' ') {
      e.preventDefault();
      setCheckedItem(index);
    }
  };

  useEffect(() => {
    const ArrayToSave: any = [];
    React.Children.map(children, (child: any): void => {
      if (child.type === Radio) {
        ArrayToSave.push(child);
      }
    });
    setRadioItems(ArrayToSave);
  }, [children]);

  return (
    <div>
      {radioItems?.map((radio: any, index) => {
        return (
          <RadioWrapper inline={inline} key={radio.props.id}>
            <Radio
              onKeyDown={(e: any): void => handleKeyDown(e, index)}
              checked={checkedItem === index || false}
              id={radio.props.id}
              ref={(ref: any): void => radioRefs.push(ref)}
              value={radio.props.value}
              radioTabIndex={0}
              onClick={(): void => {
                onChange(radio.props.value);
                setCheckedItem(index);
                radioRefs[index].focus();
              }}
            >
              {radio.props.children}
            </Radio>
          </RadioWrapper>
        );
      })}
    </div>
  );
};

export default RadioGroup;
