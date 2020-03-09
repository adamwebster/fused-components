import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

import {
  ComboboxWrapper,
  ComboboxMenu,
  MenuItemStyled,
  CaretIcon,
  ItemIcon,
  InputStyled
} from "./style";
import { Icon } from "../../icon";
import { FCThemeConsumer } from "../../../theming/FCTheme";

export interface Props {
  /** An array of items */
  items: Array<any>,
  /** Icon to show in the input */
  inputIcon?: string,
  /** If the input should be in error */
  inError?: boolean,
  /** If the input should be in warning */
  inWarning?: boolean,
  /** If the item should be disabled */
  disabled?: boolean,
  /** The placeholder for the input */
  placeholder?: string,
  itemFormatter?: (value: any) => any;
  keyToSearch?: string;
}

export const Combobox = ({
  items,
  inputIcon,
  inError,
  inWarning,
  disabled,
  placeholder,
  itemFormatter,
  keyToSearch
}: Props) => {
  const [itemsToShow, setItemsToShow] = useState(items);
  const [initialItems, setInitialItems] = useState(items);
  const [filterValue, setFilterValue] = useState("");
  const [itemSelected, setItemSelected] = useState("");
  const [itemSelectedIndex, setItemSelectedIndex] = useState(-1);
  const [menuOpen, setMenuOpen] = useState(false);
  let filterRef = useRef<HTMLInputElement>(null);
  let itemRefs: Array<HTMLElement> = [];
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    window.addEventListener("mousedown", e => handleClickOutside(e));

    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
      window.removeEventListener("mousedown", e => handleClickOutside(e));
    };
  });

  useEffect(() => {
    formatItems();
  }, [menuOpen])

  const formatItems = () => {
    if (itemFormatter) {
      const itemsToFormat = initialItems;
      if (itemsToFormat) {
        itemsToFormat.forEach((item, index) => {
          item.index = index
        })
      }
      setInitialItems(itemsToFormat);
    }
  }

  const checkIfParent = (el:any, elToCompare:any) =>  {
    while (el.parentNode) {
        el = el.parentNode;
        if (el === elToCompare)
            return true;
    }
    return false;
}
  const handleClickOutside = (e: MouseEvent) => {
    const element = (e.target as HTMLElement);
    const test = checkIfParent(element, menuRef.current )
    if (!test) {
      if (menuOpen) {
       setMenuOpen(false);
      }
    }
  };

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
    let filterItemList;
    if (keyToSearch) {
      filterItemList = items.filter(item =>
        item[keyToSearch].toLowerCase().includes(e.target.value.toLowerCase())
      )
    } else {
      filterItemList = items.filter(item =>
        item.toLowerCase().includes(e.target.value.toLowerCase())
      );
    }

    setMenuOpen(true);
    if (filterRef.current) {
      if (filterRef.current.value.length > 0) {
        setItemsToShow(filterItemList);
      } else {
        setItemsToShow(items);
        setMenuOpen(false);
      }
    }
  };

  const setValue = (value: React.SetStateAction<string>) => {
    setFilterValue(value);
    setItemSelected(value);
    setMenuOpen(false);
    setItemSelectedIndex(-1);
  };

  const handleItemKeyPress = (e: { charCode: number; }, item: string) => {
    if (e.charCode === 13) {
      setValue(item);
    }
  };

  return (
    <FCThemeConsumer>
      {themeContext => (
        <ComboboxWrapper onClick={() => setMenuOpen(!menuOpen)}>
          <InputStyled
            value={filterValue}
            icon={inputIcon}
            inputRef={filterRef}
            onChange={(e: { target: { value: string; }; }) => filterItems(e)}
            placeholder={placeholder}
            inError={inError}
            inWarning={inWarning}
            disabled={disabled}
            theme={themeContext?.theme}
          />
          {menuOpen && (
            <ComboboxMenu theme={themeContext?.theme} ref={menuRef}>
            {itemFormatter ?
                <>
                  {itemsToShow.map((item, index) => {
                    return (
                      <MenuItemStyled
                        theme={themeContext?.theme}
                        tabIndex={0}
                        onKeyPress={(e: { charCode: number }) =>
                          handleItemKeyPress(e, item[keyToSearch as string])
                        }
                        onClick={() => setValue(item[keyToSearch as string])}
                        key={item.index}
                        ref={(ref: any) => {
                          itemRefs[index] = ref;
                        }}
                      >
                        {itemFormatter(item.index)}
                      </MenuItemStyled>
                    )
                  })}
                </>
                :
                <>
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
                          <ItemIcon
                            theme={themeContext?.theme}
                          >
                            <Icon icon="check-circle" />
                          </ItemIcon>
                        )}
                        {item}
                      </MenuItemStyled>
                    );
                  })}
                </>
              }
              {itemsToShow.length === 0 && (
                <MenuItemStyled theme={themeContext?.theme}>Nothing found</MenuItemStyled>
              )}
            </ComboboxMenu>
          )}
          <CaretIcon>
            <Icon icon={menuOpen ? "caret-up" : "caret-down"} />
          </CaretIcon>
        </ComboboxWrapper>
      )}
    </FCThemeConsumer>
  );
};

Combobox.propTypes = {
  items: PropTypes.array,
  /** Sets the icon for the input */
  inputIcon: PropTypes.node,
  /** Sets the input to be in error */
  inError: PropTypes.bool,
  /** Sets the input to be in warning */
  inWarning: PropTypes.bool,
  /** Sets the input to be disabled */
  disabled: PropTypes.bool
};
