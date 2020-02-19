import React, { useState, useRef, useEffect } from "react";
import { Input } from "../Input";
import { Icon } from "../../icon";

import {
  AutoCompleteWrapper,
  AutoCompleteMenu,
  MenuItemStyled,
  ItemIcon
} from "./style";

export interface Props {
  items: Array<string>,
  inputIcon?: Node,
  inError?: Boolean,
  inWarning?: Boolean,
  disabled?: Boolean,
  placeholder?: String,
}

export const AutoComplete = ({ items = ["Apple", "Orange", "Banana"], inputIcon, inError = false, inWarning = false, disabled = false, placeholder }: Props) => {
  const [itemsToShow, setItemsToShow] = useState(items);
  const [filterValue, setFilterValue] = useState("");
  const [itemSelected, setItemSelected] = useState("");
  const [itemSelectedIndex, setItemSelectedIndex] = useState(-1);
  const [menuOpen, setMenuOpen] = useState(false);
  const filterRef = useRef<HTMLInputElement>(null);
  let itemRefs: Array<HTMLElement> = [];

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);

    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  });

  const handleUserKeyPress = (e: { keyCode: number; }) => {
    // Escape Key
    if (e.keyCode === 27) {
      if (menuOpen) {
        setMenuOpen(false);
      }
    }
    // Down Key
    if (e.keyCode === 40) {
      if (menuOpen) {
        if (document.activeElement !== itemRefs[0] && itemSelectedIndex < 1) {
          itemRefs[0].focus();
          setItemSelectedIndex(0);
        } else {
          itemRefs[itemSelectedIndex + 1].focus();
          setItemSelectedIndex(itemSelectedIndex + 1);
        }
      }
    }
    // Up key
    if (e.keyCode === 38) {
      if (menuOpen) {
        itemRefs[itemSelectedIndex - 1].focus();
        setItemSelectedIndex(itemSelectedIndex - 1);
      }
    }
  };

  const filterItems = (e: { target: { value: string; }; }) => {
    setFilterValue(e.target.value);
    const filterItemList = items.filter(item =>
      item.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setMenuOpen(true);
    if (filterRef.current) {
      if (filterRef.current.value.length > 0) {
        setItemsToShow(filterItemList);
      } else {
        setItemsToShow(items);
      }
    }
  };

  const setValue = (value: React.SetStateAction<string>) => {
    setFilterValue(value);
    setItemSelected(value);
    setMenuOpen(false);
    setItemSelectedIndex(-1);
  };

  const handleItemKeyPress = (e: { charCode: number; }, item: React.SetStateAction<string>) => {
    if (e.charCode === 13) {
      setValue(item);
    }
  };

  return (
    <AutoCompleteWrapper>
      <Input
        value={filterValue}
        icon={inputIcon}
        inputRef={filterRef}
        onChange={(e: { target: { value: string; }; }) => filterItems(e)}
        placeholder={placeholder}
        inError={inError}
        inWarning={inWarning}
        disabled={disabled}
      />
      {menuOpen && (
        <AutoCompleteMenu>
          {itemsToShow.map((item, index) => {
            return (
              <MenuItemStyled
                tabIndex="0"
                onKeyPress={(e: { charCode: number; }) => handleItemKeyPress(e, item)}
                onClick={() => setValue(item)}
                key={item}
                ref={(ref: HTMLElement) => {
                  itemRefs[index] = ref;
                }}
              >
                {item === itemSelected && (
                  <ItemIcon>
                    <Icon icon="check-circle" />
                  </ItemIcon>
                )}
                {item}
              </MenuItemStyled>
            );
          })}
          {itemsToShow.length === 0 && (
            <MenuItemStyled>Nothing found</MenuItemStyled>
          )}
        </AutoCompleteMenu>
      )}
    </AutoCompleteWrapper>
  );
};
