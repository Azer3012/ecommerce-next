import React from 'react';
import styled from 'styled-components';

const Button = () => {

    const Button = styled.button`
      display: inline-block;
      border-radius: 3px;
      padding: 0.5rem 0;
      margin: 0.5rem 1rem;
      width: 11rem;
      background: black;
      color: white;
      border: 2px solid white;
      ${props => props.primary && css`
        background: red;
        color: black;
  `}
    `

    return (
        <div>
            <Button>Show More</Button>
        </div>
    )
}

export default Button