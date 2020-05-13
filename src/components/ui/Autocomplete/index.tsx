import React, { useState, useRef, useEffect, ReactElement, ReactNode } from 'react';
import { Input } from '../Input';
import { Icon } from '../../icon';
import { AutocompleteWrapper, MenuItemStyled, ItemIcon, NoItemFound } from './style';
import { FCThemeConsumer } from '../../../theming/FCTheme';
import { Placement as PopperPlacements } from '@popperjs/core';
import PopOutMenu from '../PopoutMenu/PopOutMenu';

export interface Props {
  // The id of the element. Required for accessibility.
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
  /**  Sets the placement of the dropdown menu */
  placement?: PopperPlacements;
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
  placement = 'bottom-start',
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
  const menuRef = useRef<HTMLUListElement>(('' as unknown) as HTMLUListElement);
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
        if (onItemClick) {
          onItemClick(itemSelectedIndex);
        }
      }
      // Escape Key
      if (e.keyCode === 27 || e.keyCode === 9) {
        if (e.keyCode === 27) e.preventDefault();
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

  useEffect(() => {
    formatItems();
  }, [items]);

  useEffect(() => {
    if (onChange) {
      formatItems();
      filterItems(filterValue);
    }
  }, [items]);

  let ariaProps: any = {
    'aria-controls': id + '-menu',
    'aria-expanded': false,
  };

  if (activeDescendant) {
    ariaProps = { ...ariaProps, 'aria-activedescendant': activeDescendant };
  }
  if (menuOpen) {
    ariaProps = { ...ariaProps, 'aria-expanded': true };
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
            role="combobox"
            onKeyDown={e => handleUserKeyPress(e)}
            {...ariaProps}
            {...rest}
          />
          {menuOpen && (
            <PopOutMenu
              aria-label="Autocomplete Menu"
              role="listbox"
              id={`${id}-menu`}
              ref={menuRef}
              referenceElement={filterRef.current}
              placement={placement}
            >
              <>
                {itemsToShow.map((item, index) => {
                  const value = itemFormatter ? item[keyToSearch as string] : item.label;

                  return (
                    <MenuItemStyled
                      role="option"
                      theme={themeContext.theme}
                      id={item.htmlID}
                      onClick={(): void => {
                        setValue(value);
                        if (onItemClick) onItemClick(item.index);
                      }}
                      onMouseEnter={(e: any): void => {
                        setActiveDescendant(e.target.id);
                      }}
                      key={item.index}
                      ref={(ref: HTMLLIElement): void => {
                        itemRefs[index] = ref;
                      }}
                      tabIndex={-1}
                      aria-selected={index === itemSelectedIndex ? 'true' : 'false'}
                    >
                      {itemFormatter ? (
                        itemFormatter(item.index)
                      ) : (
                        <>
                          <span aria-label={`${item.label} press enter to choose this option`}>
                            {item.label === itemSelected && (
                              <ItemIcon theme={themeContext.theme}>
                                <Icon icon="check-circle" />
                              </ItemIcon>
                            )}
                            {item.label}
                          </span>
                        </>
                      )}
                    </MenuItemStyled>
                  );
                })}
              </>
              {itemsToShow.length === 0 && (
                <NoItemFound role="alert" theme={themeContext.theme}>
                  Nothing found
                </NoItemFound>
              )}
            </PopOutMenu>
          )}
        </AutocompleteWrapper>
      )}
    </FCThemeConsumer>
  );
};
