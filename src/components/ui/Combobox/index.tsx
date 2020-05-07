import React, { useState, useRef, useEffect, ReactElement, ReactNode } from 'react';
import { ComboboxWrapper, ComboboxMenu, MenuItemStyled, CaretIcon, ItemIcon, InputStyled } from './style';
import { Icon } from '../../icon';
import { FCThemeConsumer } from '../../../theming/FCTheme';

export interface Props {
  /** An array of items */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: Array<any>;
  /** Icon to show in the input */
  inputIcon?: string;
  /** If the input should be in error */
  inError?: boolean;
  /** If the input should be in warning */
  inWarning?: boolean;
  /** If the item should be disabled */
  disabled?: boolean;
  /** The placeholder for the input */
  placeholder?: string;
  /** Defines the formatting for the item. Returns the index of the item */
  itemFormatter?: (index: number) => ReactElement;
  /** What key should be search in the data that you send to the Combobox */
  keyToSearch?: string;
  id: string;
}

export const Combobox = ({
  items,
  inputIcon,
  inError,
  inWarning,
  disabled,
  placeholder,
  itemFormatter,
  keyToSearch,
  id,
  ...rest
}: Props): ReactElement => {
  const [itemsToShow, setItemsToShow] = useState(items);
  const [formattedItems, setFormattedItems] = useState<any>([]);
  const [filterValue, setFilterValue] = useState('');
  const [itemSelected, setItemSelected] = useState('');
  const [itemSelectedIndex, setItemSelectedIndex] = useState(-1);
  const [activeDescendant, setActiveDescendant] = useState('');
  const [activeListItem, setActiveListItem] = useState<HTMLLIElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const filterRef = useRef<HTMLInputElement>(('' as unknown) as HTMLInputElement);
  const itemRefs: Array<HTMLLIElement> = [];
  const menuRef = useRef<HTMLUListElement>(('' as unknown) as HTMLUListElement);
  const isMounted = useRef(true);
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
      setItemsToShow(formattedItemsReturned);
    }
  };

  const checkIfParent = (el: HTMLElement, elToCompare: unknown): boolean => {
    while (el.parentNode) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      el = el.parentNode as HTMLElement;
      if (el === elToCompare) return true;
    }
    return false;
  };
  const handleClickOutside = (e: any): void => {
    const element: HTMLElement = e.target;
    const test = checkIfParent(element as HTMLElement, menuRef.current);
    if (!test) {
      if (menuOpen) {
        if (menuRef.current) {
          setMenuOpen(false);
          setActiveDescendant('');
        }
      }
    }
  };

  const setValue = (value: React.SetStateAction<string>): void => {
    setFilterValue(value);

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
    setFilterValue(e.target.value);
    filterItems(e.target.value);
  };

  const handleItemKeyPress = (e: { key: string }, item: string): void => {
    if (e.key === 'Enter') {
      setValue(item);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress);
    window.addEventListener('mousedown', e => handleClickOutside(e));

    return (): void => {
      window.removeEventListener('keydown', handleUserKeyPress);
      window.removeEventListener('mousedown', e => handleClickOutside(e));
    };
  });

  useEffect(() => {
    formatItems();
  }, [menuOpen]);

  useEffect(() => {
    return () => {
      isMounted.current === false;
    };
  }, []);
  let ariaProps = {};
  if (activeDescendant) {
    ariaProps = { ...ariaProps, 'aria-activedescendant': activeDescendant };
  }
  return (
    <FCThemeConsumer>
      {(themeContext): ReactNode => (
        <ComboboxWrapper onClick={(): void => setMenuOpen(!menuOpen)}>
          <InputStyled
            id={id}
            value={filterValue}
            icon={inputIcon}
            ref={filterRef}
            onChange={(e: { target: { value: string } }): void => onChangeFunc(e)}
            placeholder={placeholder}
            inError={inError}
            inWarning={inWarning}
            disabled={disabled}
            theme={themeContext.theme}
            autoComplete="off"
            role="combobox"
            onKeyDown={e => handleUserKeyPress(e)}
            {...ariaProps}
            {...rest}
          />
          {menuOpen && (
            <ComboboxMenu role="listbox" theme={themeContext.theme} ref={menuRef}>
              <>
                {itemsToShow.map((item: any, index) => {
                  const value = itemFormatter ? item[keyToSearch as string] : item.label;
                  return (
                    <MenuItemStyled
                      role="option"
                      theme={themeContext.theme}
                      id={`${id.toLowerCase().replace(' ', '_')}_option_${index}`}
                      onKeyDown={(e: { key: string }): void => handleItemKeyPress(e, value)}
                      onMouseDown={(): void => setValue(value)}
                      onMouseEnter={(e: any): void => {
                        setActiveDescendant(e.target.id);
                      }}
                      key={item.label}
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

              {itemsToShow.length === 0 && <MenuItemStyled theme={themeContext.theme}>Nothing found</MenuItemStyled>}
            </ComboboxMenu>
          )}
          <CaretIcon>
            <Icon title={menuOpen ? 'Menu open' : 'Menu closed'} icon={menuOpen ? 'caret-up' : 'caret-down'} />
          </CaretIcon>
        </ComboboxWrapper>
      )}
    </FCThemeConsumer>
  );
};
