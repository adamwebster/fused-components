import React, { useState } from 'react';
import { Radio } from '../components/ui/Radio'

export const RadioDemo = () => {
  const [checked, setChecked] = useState('');
  const [radioOneValue,] = useState('Check 1');
  const [radioTwoValue,] = useState('Check 2')
  return (
    <>
      <Radio value="Check 1" name="RadioGroup1" checked={radioOneValue === checked} onChange={(e) => setChecked(e.target.value)}>Check me</Radio>
      <Radio value="Check 2" name="RadioGroup1" checked={radioTwoValue === checked} onChange={(e) => setChecked(e.target.value)}>Check me 2</Radio>
    </>
  )
}