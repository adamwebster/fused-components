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
  const [formattedItems, setFormattedItems] = useState<any>([]);
  const [filterValue, setFilterValue] = useState('');
  const [itemSelected, setItemSelected] = useState('');
  const [itemSelectedIndex, setItemSelectedIndex] = useState(-1);
  const [activeDescendant, setActiveDescendant] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeListItem, setActiveListItem] = useState<HTMLLIElement | null>(null);
  const filterRef = useRef<HTMLInputElement>(('' as unknown) as HTMLInputElement);
  const itemRefs: Array<HTMLLIElement> = [];
  const autoCompleteRef = useRef<HTMLDivElement>(('' as unknown) as HTMLDivElement);
  const formatItems = (): void => {
    if (itemFormatter) {
      const itemsToFormat = items;
      itemsToFormat.forEach((item, index) => {
        item.index = index;
        item.htmlID = `${id.toLowerCase().replace(/\./g, '')}_option_${index}`;
      });
      setFormattedItems(itemsToFormat);
    } else {
      const formattedItemsReturned: any = [];
      items.forEach((item, index) => {
        formattedItemsReturned.push({
          index,
          label: item,
          htmlID: `${id.toLowerCase().replace(/\./g, '')}_option_${index}`,
        });
      });
      setFormattedItems(formattedItemsReturned);
    }
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

  const handleUserKeyPress = (e: { keyCode: number; preventDefault: () => void }): void => {
    if (menuOpen) {
      // Enter Key
      if (e.keyCode === 13) {
        if (keyToSearch) {
          setValue(itemsToShow[itemSelectedIndex][keyToSearch]);
        } else {
          setValue(itemsToShow[itemSelectedIndex].label);
        }
      }
      // Escape Key
      if (e.keyCode === 27) {
        e.preventDefault();
        setMenuOpen(false);
        setItemSelectedIndex(-1);
        setActiveDescendant('');
      }
      // Down Key
      if (e.keyCode === 40) {
        e.preventDefault();
        const toCheck = itemSelectedIndex + 1 !== itemsToShow.length;
        if (toCheck) {
          if (activeListItem !== itemRefs[0] && itemSelectedIndex < 1) {
            setActiveListItem(itemRefs[0]);
            setItemSelectedIndex(0);

            setActiveDescendant(itemsToShow[0].htmlID);
          } else {
            setActiveDescendant(itemsToShow[itemSelectedIndex + 1].htmlID);
            setActiveListItem(itemRefs[itemSelectedIndex + 1]);
            setItemSelectedIndex(itemSelectedIndex + 1);
          }
        }
      }
      // Up key
      if (e.keyCode === 38) {
        e.preventDefault();
        if (itemSelectedIndex != 0) {
          setActiveListItem(itemRefs[itemSelectedIndex - 1]);
          setItemSelectedIndex(itemSelectedIndex - 1);
          setActiveDescendant(itemsToShow[itemSelectedIndex + -1].htmlID);
        }
      }
    }
  };

  const filterItems = (value: string): void => {
    let filterItemList;
    if (keyToSearch) {
      filterItemList = formattedItems
        .slice()
        .filter((item: any) => item[keyToSearch].toLowerCase().includes(value.toLowerCase()));
    } else {
      filterItemList = formattedItems
        .slice()
        .filter((item: any) => item.label.toLowerCase().includes(value.toLowerCase()));
    }
    setMenuOpen(true);
    if (filterRef.current.value.length > 0) {
      setItemsToShow(filterItemList);
    } else {
      setItemsToShow(filterItemList);
      setMenuOpen(false);
      setActiveDescendant('');
      setItemSelectedIndex(-1);
    }
  };

  const onChangeFunc = (e: { target: { value: string } }): void => {
    if (onChange) {
      onChange(e);
    }
    setFilterValue(e.target.value);
    filterItems(e.target.value);
  };

  const handleItemKeyPress = (e: { key: string }, item: React.SetStateAction<string>): void => {
    if (e.key === 'Enter') {
      setValue(item);
    }
  };

  useEffect(() => {
    formatItems();
  }, [items]);

  useEffect(() => {
    autoCompleteRef.current.addEventListener('keydown', handleUserKeyPress);
    return (): void => {
      autoCompleteRef.current.removeEventListener('keydown', handleUserKeyPress);
    };
  });
  useEffect(() => {
    if (onChange) {
      formatItems();
      filterItems(filterValue);
    }
  }, [items]);

  let ariaProps = {};
  if (activeDescendant) {
    ariaProps = { ...ariaProps, 'aria-activedescendant': activeDescendant };
  }
  return (
    <FCThemeConsumer>
      {(themeContext): ReactNode => (
        <AutocompleteWrapper ref={autoCompleteRef}>
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
              <>
                {itemsToShow.map((item, index) => {
                  return (
                    <MenuItemStyled
                      role="option"
                      theme={themeContext.theme}
                      id={item.htmlID}
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
                      aria-selected={index === itemSelectedIndex ? 'true' : 'false'}
                    >
                      {itemFormatter ? (
                        itemFormatter(item.index)
                      ) : (
                        <>
                          {item === itemSelected && (
                            <ItemIcon theme={themeContext.theme}>
                              <Icon icon="check-circle" />
                            </ItemIcon>
                          )}
                          {item.label}
                        </>
                      )}
                    </MenuItemStyled>
                  );
                })}
              </>
              {itemsToShow.length === 0 && <NoItemFound theme={themeContext.theme}>Nothing found</NoItemFound>}
            </AutocompleteMenu>
          )}
        </AutocompleteWrapper>
      )}
    </FCThemeConsumer>
  );
};
