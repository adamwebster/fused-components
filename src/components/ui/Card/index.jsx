import React from 'react';
import PropTypes from 'prop-types';

import {StyledCard} from './style';

const Card = ({borderRadius, boxShadow, ...rest}) => {
  return(
    <StyledCard borderRadius={borderRadius} boxShadow={boxShadow} {...rest} />
  )
}

Card.defaultProps = {
  borderRadius: '5px',
  boxShadow: false,
}
Card.propTypes = {
  borderRadius: PropTypes.string,
  boxShadow: PropTypes.bool,
}

export default Card;