import React, { useState } from 'react';
import { Toggle } from '../components/ui/Toggle'

export const ToggleDemo = () => {
  const [active, setActive] = useState(false);
  const [activeLabels, setActiveLabels] = useState(false);

  return (
    <>
      <Toggle active={active} onClick={() => setActive(!active)} />
      <br />
      <Toggle active={activeLabels} showLabels onClick={() => setActiveLabels(!activeLabels)} />
    </>
  )
}