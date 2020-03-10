import React, { useState, useRef, useEffect } from "react";
import { Input } from "../Input";
import { Icon } from "../../icon";

import {
  AutocompleteWrapper,
  AutocompleteMenu,
  MenuItemStyled,
  ItemIcon,
  NoItemFound
} from "./style";
import { FCThemeConsumer } from "../../../theming/FCTheme";

export interface Props {
  /** Defines what items are sent to the auto complete component*/
  items: Array<any>;
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
  itemFormatter?: (value: any) => any;
  keyToSearch?: string;
  onInputChange?: (e: any) => void;
}

export const Autocomplete = ({
  items = ["Apple", "Orange", "Banana"],
  inputIcon,
  inError = false,
  inWarning = false,
  disabled = false,
  placeholder,
  itemFormatter,
  keyToSearch,
  onInputChange
}: Props) => {
  const [itemsToShow, setItemsToShow] = useState(items);
  const [initialItems, setInitialItems] = useState(items);
  const [menuItems, setMenuItems] = useState([] as any)
  const [filterValue, setFilterValue] = useState("");
  const [itemSelected, setItemSelected] = useState("");
  const [itemSelectedIndex, setItemSelectedIndex] = useState(-1);
  const [menuOpen, setMenuOpen] = useState(false);
  const filterRef = useRef<HTMLInputElement>(null);
  let itemRefs: Array<HTMLElement> = [];

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    console.log(items);
    formatItems();
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  });

  const formatItems = () => {
    if (itemFormatter) {
      const itemsToFormat = items;
      if (itemsToFormat) {
        itemsToFormat.forEach((item, index) => {
          item.index = index
        })
      }
      setInitialItems(itemsToFormat);
    }
  }

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

    if(onInputChange){
      setMenuItems(filterItemList);
      console.log('fi', filterItemList);
      onInputChange(e);
    }

  //  setMenuOpen(true);
    if (filterRef.current) {
      if (filterRef.current.value.length > 0) {
       // setItemsToShow(filterItemList);
      } else {
    //    setItemsToShow(items);
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
          {console.log('3', menuItems)}
          {menuOpen && (
            <AutocompleteMenu theme={themeContext?.theme}>
              {itemFormatter ?
                <>
                {console.log('2', itemsToShow)}
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
                <NoItemFound theme={themeContext?.theme}>Nothing found</NoItemFound>
              )}
            </AutocompleteMenu>
          )}
        </AutocompleteWrapper>
      )}
    </FCThemeConsumer>
  );
};
