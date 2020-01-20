import React from 'react';

import {StyledCard} from './style';

const Card = ({...rest}) => {
  return(
    <StyledCard {...rest} />
  )
}
export default Card;