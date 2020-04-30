import React, { useState, useRef, useEffect, ReactElement, ReactNode } from 'react';
import { Input } from '../Input';
import { Icon } from '../../icon';

import { AutocompleteWrapper, AutocompleteMenu, MenuItemStyled, ItemIcon, NoItemFound } from './style';
import { FCThemeConsumer } from '../../../theming/FCTheme';

export interface Props {
  id: string;
  /** Defines what items are sent to the auto complete component*/
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  /** Define what an item in the dropdown menu looks */
  itemFormatter?: (index: number) => ReactElement;
  /** Used in conjunction with item formatter to define what key in your data that should be searched */
  keyToSearch?: string;
  /** The onChange handler for the input. Returns the element */
  onChange?: (e: { target: { value: string } }) => void;
  /** What should happen when an item in the menu is clicked. Returns the index of the item clicked */
  onItemClick?: (index: number) => void;
  /** If you would like the value to be empty when an item is selected add this property */
  clearValueOnSelect?: boolean;
}

export const Autocomplete = ({
  id,
  items,
  inputIcon,
  inError,
  inWarning,
  disabled,
  placeholder,
  itemFormatter,
  keyToSearch,
  onChange,
  onItemClick,
  clearValueOnSelect,
  ...rest
}: Props): ReactElement => {
  const [itemsToShow, setItemsToShow] = useState(items);
  const [filterValue, setFilterValue] = useState('');
  const [itemSelected, setItemSelected] = useState('');
  const [itemSelectedIndex, setItemSelectedIndex] = useState(-1);
  const [activeDescendant, setActiveDescendant] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const filterRef = useRef<HTMLInputElement>(('' as unknown) as HTMLInputElement);
  const itemRefs: Array<HTMLLIElement> = [];

  const formatItems = (): void => {
    if (itemFormatter) {
      const itemsToFormat = items;
      itemsToFormat.forEach((item, index) => {
        item.index = index;
      });
    }
  };

  const handleUserKeyPress = (e: { keyCode: number }): void => {
    if (menuOpen) {
      // Escape Key
      if (e.keyCode === 27) {
        setMenuOpen(false);
        setActiveDescendant('');
      }
      // Down Key
      if (e.keyCode === 40) {
        if (document.activeElement !== itemRefs[0] && itemSelectedIndex < 1) {
          itemRefs[0].focus();
          setItemSelectedIndex(0);
        } else {
          itemRefs[itemSelectedIndex + 1].focus();
          setItemSelectedIndex(itemSelectedIndex + 1);
        }
      }
      // Up key
      if (e.keyCode === 38) {
        itemRefs[itemSelectedIndex - 1].focus();
        setItemSelectedIndex(itemSelectedIndex - 1);
      }
    }
  };

  const filterItems = (): void => {
    let filterItemList;
    if (keyToSearch) {
      filterItemList = items.filter(item => item[keyToSearch].toLowerCase().includes(filterValue.toLowerCase()));
    } else {
      filterItemList = items.filter(item => item.toLowerCase().includes(filterValue.toLowerCase()));
    }

    setMenuOpen(true);
    if (filterRef.current.value.length > 0) {
      setItemsToShow(filterItemList);
    } else {
      setItemsToShow(items);
      setMenuOpen(false);
      setActiveDescendant('');
    }
  };

  const onChangeFunc = (e: { target: { value: string } }): void => {
    if (onChange) {
      onChange(e);
    }
    setFilterValue(e.target.value);

    filterItems();
  };

  const setValue = (value: React.SetStateAction<string>): void => {
    if (clearValueOnSelect) {
      setFilterValue('');
    } else {
      setFilterValue(value);
    }
    setItemSelected(value);
    setMenuOpen(false);
    setActiveDescendant('');
    setItemSelectedIndex(-1);
  };

  const handleItemKeyPress = (e: { key: string }, item: React.SetStateAction<string>): void => {
    if (e.key === 'Enter') {
      setValue(item);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress);
    formatItems();

    return (): void => {
      window.removeEventListener('keydown', handleUserKeyPress);
    };
  });

  useEffect(() => {
    if (onChange) {
      setItemsToShow(items);
      filterItems();
    }
  }, [items]);

  let ariaProps = {};
  if (activeDescendant) {
    ariaProps = { ...ariaProps, 'aria-activedescendant': activeDescendant };
  }
  return (
    <FCThemeConsumer>
      {(themeContext): ReactNode => (
        <AutocompleteWrapper>
          <Input
            id={id}
            value={filterValue}
            icon={inputIcon}
            ref={filterRef}
            onChange={(e): void => onChangeFunc(e)}
            placeholder={placeholder}
            inError={inError}
            inWarning={inWarning}
            disabled={disabled}
            autoComplete="off"
            theme={themeContext.theme}
            {...ariaProps}
            {...rest}
          />
          {menuOpen && (
            <AutocompleteMenu menuOpen={menuOpen} role="listbox" theme={themeContext.theme}>
              {itemFormatter ? (
                <>
                  {itemsToShow.map((item, index) => {
                    return (
                      <MenuItemStyled
                        role="option"
                        theme={themeContext.theme}
                        tabIndex={0}
                        id={`${id.toLowerCase().replace(' ', '_')}_option_${index}`}
                        onKeyDown={(e: any): void => {
                          handleItemKeyPress(e, item[keyToSearch as string]);
                          if (onItemClick) onItemClick(item.index);
                        }}
                        onClick={(): void => {
                          setValue(item[keyToSearch as string]);
                          if (onItemClick) onItemClick(item.index);
                        }}
                        onFocus={(e: any): void => {
                          setActiveDescendant(e.target.id);
                        }}
                        onMouseEnter={(e: any): void => {
                          setActiveDescendant(e.target.id);
                        }}
                        key={item.index}
                        ref={(ref: HTMLLIElement): void => {
                          itemRefs[index] = ref;
                        }}
                      >
                        {itemFormatter(item.index)}
                      </MenuItemStyled>
                    );
                  })}
                </>
              ) : (
                <>
                  {itemsToShow.map((item, index) => {
                    return (
                      <MenuItemStyled
                        theme={themeContext.theme}
                        tabIndex={0}
                        id={`${id.toLowerCase().replace(' ', '_')}_option_${index}`}
                        role="option"
                        onKeyDown={(e: { key: string }): void => handleItemKeyPress(e, item)}
                        onClick={(): void => setValue(item)}
                        onFocus={(e: any): void => {
                          setActiveDescendant(e.target.id);
                        }}
                        onMouseEnter={(e: any): void => {
                          setActiveDescendant(e.target.id);
                        }}
                        key={item}
                        ref={(ref: HTMLLIElement): void => {
                          itemRefs[index] = ref;
                        }}
                      >
                        {item === itemSelected && (
                          <ItemIcon theme={themeContext.theme}>
                            <Icon icon="check-circle" />
                          </ItemIcon>
                        )}
                        {item}
                      </MenuItemStyled>
                    );
                  })}
                </>
              )}
              {itemsToShow.length === 0 && <NoItemFound theme={themeContext.theme}>Nothing found</NoItemFound>}
            </AutocompleteMenu>
          )}
        </AutocompleteWrapper>
      )}
    </FCThemeConsumer>
  );
};
