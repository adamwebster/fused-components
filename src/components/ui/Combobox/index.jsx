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
import Icon from "../../icon";

export const Combobox = ({
  items,
  inputIcon,
  inError,
  inWarning,
  disabled,
  placeholder
}) => {
  const [itemsToShow, setItemsToShow] = useState(items);
  const [filterValue, setFilterValue] = useState("");
  const [itemSelected, setItemSelected] = useState("");
  const [itemSelectedIndex, setItemSelectedIndex] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  let filterRef = useRef(null);
  let itemRefs = {};
  const menuRef = useRef(null);
  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = e => {
    if (e.target.parentNode !== menuRef.current && e.target !== filterRef) {
      if (menuOpen) {
        setMenuOpen(false);
      }
    }
  };
  const handleUserKeyPress = e => {
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

  const filterItems = e => {
    setFilterValue(e.target.value);
    const filterItemList = items.filter(item =>
      item.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setMenuOpen(true);
    if (filterRef.value.length > 0) {
      setItemsToShow(filterItemList);
    } else {
      setItemsToShow(items);
    }
  };

  const setValue = value => {
    setFilterValue(value);
    setItemSelected(value);
    setMenuOpen(false);
    setItemSelectedIndex(null);
  };

  const handleItemKeyPress = (e, item) => {
    if (e.charCode === 13) {
      setValue(item);
    }
  };

  return (
    <ComboboxWrapper>
      <InputStyled
        value={filterValue}
        icon={inputIcon}
        inputRef={ref => { filterRef = ref;}}
        onChange={e => filterItems(e)}
        placeholder={placeholder}
        inError={inError}
        inWarning={inWarning}
        disabled={disabled}
        onClick={() => setMenuOpen(!menuOpen)}
      />
      {menuOpen && (
        <ComboboxMenu ref={menuRef}>
          {itemsToShow.map((item, index) => {
            return (
              <MenuItemStyled
                tabIndex="0"
                onKeyPress={e => handleItemKeyPress(e, item)}
                onClick={() => setValue(item)}
                key={item}
                ref={ref => {
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
        </ComboboxMenu>
      )}
      <CaretIcon>
        <Icon icon={menuOpen ? "caret-up" : "caret-down"} />
      </CaretIcon>
    </ComboboxWrapper>
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

Combobox.defaultProps = {
  items: ["Apple", "Orange", "Banana"]
};
