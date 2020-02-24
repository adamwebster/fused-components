import React, { useState, useRef, useEffect } from "react";
import { Input } from "../Input";
import { Icon } from "../../icon";

import {
  AutocompleteWrapper,
  AutocompleteMenu,
  MenuItemStyled,
  ItemIcon
} from "./style";
import { FCThemeConsumer } from "../../../theming/FCTheme";

export interface Props {
  /** Defines what items are sent to the auto complete component*/
  items: Array<string>;
  /** What icon to show for the auto complete input */
  inputIcon?: string;
  /** If the input should be in its error state */
  inError?: boolean;
  /** If the input should be in its warning state */
  inWarning?: boolean;
  /** If the input should be disabled */
  disabled?: boolean;
  /** The placeholder text for the input */
  placeholder?: string;
}

export const Autocomplete = ({
  items = ["Apple", "Orange", "Banana"],
  inputIcon,
  inError = false,
  inWarning = false,
  disabled = false,
  placeholder
}: Props) => {
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

  const handleUserKeyPress = (e: { keyCode: number }) => {
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

  const filterItems = (e: { target: { value: string } }) => {
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

  const handleItemKeyPress = (
    e: { charCode: number },
    item: React.SetStateAction<string>
  ) => {
    if (e.charCode === 13) {
      setValue(item);
    }
  };

  return (
    <FCThemeConsumer>
      {themeContext => (
        <AutocompleteWrapper>
          <Input
            value={filterValue}
            icon={inputIcon}
            inputRef={filterRef}
            onChange={(e: { target: { value: string } }) => filterItems(e)}
            placeholder={placeholder}
            inError={inError}
            inWarning={inWarning}
            disabled={disabled}
            theme={themeContext?.theme}
          />
          {menuOpen && (
            <AutocompleteMenu theme={themeContext?.theme}>
              {itemsToShow.map((item, index) => {
                return (
                  <MenuItemStyled
                    theme={themeContext?.theme}
                    tabIndex={0}
                    onKeyPress={(e: { charCode: number }) =>
                      handleItemKeyPress(e, item)
                    }
                    onClick={() => setValue(item)}
                    key={item}
                    ref={(ref: any) => {
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
            </AutocompleteMenu>
          )}
        </AutocompleteWrapper>
      )}
    </FCThemeConsumer>
  );
};
