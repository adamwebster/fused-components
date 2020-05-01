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
}: Props): ReactElement => {
  const [itemsToShow, setItemsToShow] = useState(items);
  const [initialItems, setInitialItems] = useState(items);
  const [filterValue, setFilterValue] = useState('');
  const [itemSelected, setItemSelected] = useState('');
  const [itemSelectedIndex, setItemSelectedIndex] = useState(-1);
  const [activeDescendant, setActiveDescendant] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const filterRef = useRef<HTMLInputElement>(('' as unknown) as HTMLInputElement);
  const itemRefs: Array<HTMLElement> = [];
  const menuRef = useRef<HTMLUListElement>(('' as unknown) as HTMLUListElement);

  const formatItems = (): void => {
    if (itemFormatter) {
      const itemsToFormat = initialItems;
      itemsToFormat.forEach((item, index) => {
        item.index = index;
      });

      setInitialItems(itemsToFormat);
    }
  };

  const checkIfParent = (el: HTMLElement | null, elToCompare: unknown): boolean => {
    while (el?.parentNode) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      el = el.parentNode as HTMLElement;
      if (el === elToCompare) return true;
    }
    return false;
  };
  const handleClickOutside = (e: MouseEvent): void => {
    const element = e.target;
    const test = checkIfParent(element as HTMLElement, menuRef.current);
    if (!test) {
      if (menuOpen) {
        setMenuOpen(false);
        setActiveDescendant('');
      }
    }
  };

  const handleUserKeyPress = (e: any): void => {
    if (menuOpen) {
      // Escape Key
      if (e.keyCode === 27) {
        setMenuOpen(false);
        setActiveDescendant('');
      }
      // Down Key
      if (e.keyCode === 40) {
        e.preventDefault();
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
        e.preventDefault();
        itemRefs[itemSelectedIndex - 1].focus();
        setItemSelectedIndex(itemSelectedIndex - 1);
      }
    }
  };

  const filterItems = (e: { target: { value: string } }): void => {
    setFilterValue(e.target.value);
    let filterItemList;
    if (keyToSearch) {
      filterItemList = items.filter(item => item[keyToSearch].toLowerCase().includes(e.target.value.toLowerCase()));
    } else {
      filterItemList = items.filter(item => item.toLowerCase().includes(e.target.value.toLowerCase()));
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

  const setValue = (value: React.SetStateAction<string>): void => {
    setFilterValue(value);
    setItemSelected(value);
    setMenuOpen(false);
    setItemSelectedIndex(-1);
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
            onChange={(e: { target: { value: string } }): void => filterItems(e)}
            placeholder={placeholder}
            inError={inError}
            inWarning={inWarning}
            disabled={disabled}
            theme={themeContext.theme}
            autoComplete="off"
            {...ariaProps}
          />
          {menuOpen && (
            <ComboboxMenu role="listbox" theme={themeContext.theme} ref={menuRef}>
              <>
                {itemsToShow.map((item: any, index) => {
                  const value = itemFormatter ? item[keyToSearch as string] : item;
                  return (
                    <MenuItemStyled
                      theme={themeContext.theme}
                      tabIndex={0}
                      id={`${id.toLowerCase().replace(' ', '_')}_option_${index}`}
                      onKeyDown={(e: { key: string }): void => handleItemKeyPress(e, value)}
                      onMouseDown={(): void => setValue(value)}
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
                      {!itemFormatter && item === itemSelected && (
                        <ItemIcon theme={themeContext.theme}>
                          <Icon icon="check-circle" />
                        </ItemIcon>
                      )}
                      {itemFormatter ? itemFormatter(item.index) : item}
                    </MenuItemStyled>
                  );
                })}
              </>

              {itemsToShow.length === 0 && <MenuItemStyled theme={themeContext.theme}>Nothing found</MenuItemStyled>}
            </ComboboxMenu>
          )}
          <CaretIcon>
            <Icon icon={menuOpen ? 'caret-up' : 'caret-down'} />
          </CaretIcon>
        </ComboboxWrapper>
      )}
    </FCThemeConsumer>
  );
};
