import styled from 'styled-components';

const Supreme = styled.h3`
  background: ${props => props.theme.red};
  color: white;
  display: inline-block;
  padding: 4px 5px;
  transform: skew(-3deg);
  margin: 0;
  font-size: 4rem;

  @media only screen 
  and (min-device-width: 320px) 
  and (max-device-width: 667px) 
  and (-webkit-min-device-pixel-ratio: 2) { 
    font-size: 1.5rem;
  }
`;

export default Supreme;
