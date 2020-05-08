import { ReactNode, useContext } from 'react';
import { DropdownMenuContext } from './DropdownMenuContext';

interface Props {
  children: ReactNode;
}
const DropdownButtonChildren = ({ children }: Props): any => {
  const { dropdownState } = useContext(DropdownMenuContext);
  if (dropdownState.menuVisible) return children;
  return null;
};

export default DropdownButtonChildren;
