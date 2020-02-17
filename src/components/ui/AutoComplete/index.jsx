import React, { useState, useRef } from "react";
import { Input } from "../Input";
import PropTypes from "prop-types";

import { AutoCompleteWrapper, AutoCompleteMenu, MenuItemStyled, ItemIcon } from "./style";
import Icon from "../../icon";

export const AutoComplete = ({ items }) => {
  const [itemsToShow, setItemsToShow] = useState(items);
  const [filterValue, setFilterValue] = useState('');
  const [itemSelected, setItemSelected] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const filterRef = useRef(null);

  const filterItems = e => {
      setFilterValue(e.target.value);
    const filterItemList = items.filter(item =>
      item.includes(e.target.value)
    );
    setMenuOpen(true);
    if (filterRef.current.value.length > 0) {
      setItemsToShow(filterItemList);
    } else {
      setItemsToShow(items);
    }
  };
  
  const setValue = (value) => {
        setFilterValue(value);
        setItemSelected(value);
        setMenuOpen(false);
  }
  return (
    <AutoCompleteWrapper>
      <Input value={filterValue} inputRef={filterRef} onChange={e => filterItems(e)} />
      {menuOpen && 
      <AutoCompleteMenu>
        {itemsToShow.map(item => {
          return <MenuItemStyled onClick={() => setValue(item)} key={item}>
              {item === itemSelected && <ItemIcon><Icon icon="check-circle" /></ItemIcon>}
              {item}</MenuItemStyled>;
        })}
        {itemsToShow.length === 0 &&
             <MenuItemStyled>Nothing found</MenuItemStyled>
        }
      </AutoCompleteMenu>
}
    </AutoCompleteWrapper>
  );
};

AutoComplete.propTypes = {
  items: PropTypes.array
};

AutoComplete.defaultProps = {
  items: ["item 1", "item 2", "item 3"]
};
