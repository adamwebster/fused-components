import React, { useState } from 'react';
import { Checkbox } from '../components/ui/Checkbox'

export const CheckboxDemo = () => {
  const [checked, setChecked] = useState(false);
  return(
    <Checkbox checked={checked} onChange={() => setChecked(!checked)}>Check me</Checkbox>
  )
}