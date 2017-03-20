import React, { Component } from 'react';
import { Tooltip} from 'react-bootstrap';

export const CardTooltip = ({card}) => (
   <Tooltip placement="top" className="in" id="tooltip-top">
      <p>Roll value: {card.rollValue}</p>
      <p>Cost: {card.cost}</p>
      <p>Industry: {card.industry}</p>
      <p>{card.cardDescription}</p>
    </Tooltip>
)

export default CardTooltip