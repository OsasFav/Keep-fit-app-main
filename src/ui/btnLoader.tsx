import styled, { keyframes } from 'styled-components'
export default function CircleLoader() {
  return (
    <div className='items-center'>
      <Styles></Styles>
    </div>
  )
}


const flash = keyframes`
    0% {
    background-color: #FFF2;
    box-shadow: 32px 0 #FFF2, -32px 0 #FFF;
  }
  50% {
    background-color: #FFF;
    box-shadow: 32px 0 #FFF2, -32px 0 #FFF2;
  }
  100% {
    background-color: #FFF2;
    box-shadow: 32px 0 #FFF, -32px 0 #FFF2;
  }
`;


const Styles = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 32px 0 #fff, -32px 0 #fff;
  position: relative;
  animation: ${flash} 0.5s ease-out infinite alternate;
`;


// const rotationBack = keyframes`
//   0% {
//     transform: rotate(0deg);
//   }
//   100% {
//     transform: rotate(-360deg);
//   }
// `;

/* const rotationBack = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
`; */

// const Styles = styled.div`
//   width: ${props => props.bigger || "22px"};
//   height: ${props => props.bigger || "22px"};
//   border-radius: 50%;
//   display: inline-block;
//   position: relative;
//   border: 2px solid;
//   border-width: ${props => props.radius || "2px"};
//   border-color: #FFF #FFF transparent;
//   box-sizing: border-box;
//   animation: ${rotation} 1s linear infinite;


//   &::after{
//     content: '';  
//     box-sizing: border-box;
//     position: absolute;
//     left: 0;
//     right: 0;
//     top: 0;
//     bottom: 0;
//     margin: auto;
//     border: 2px solid;
//     border-width: ${props => props.radius || "2px"};
//     border-color: transparent #17ffe2 #17ffe2;
//     width: ${props => props.smaller || "12px"};
//     height: ${props => props.smaller || "12px"};
//     border-radius: 50%;
//     animation: ${rotationBack} 0.5s linear infinite;
//     transform-origin: center center;
//   }
// `;