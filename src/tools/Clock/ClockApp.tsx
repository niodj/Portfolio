import { any } from "prop-types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Isloading } from "../IsLoading/IsLoading";


export const ClockApp = () => {
  const [time, setTime] = useState(new Date());

  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  
 
  const sec = Math.floor((time.getSeconds() / 60) * 360);
   const min = Math.floor((time.getMinutes() / 60) * 360 + sec / 60);
  const hour = Math.floor((time.getHours() / 12) * 360 + (min/12));
  
    const getClockNumbers = () => {
      const numbers = [];
      for (let i = 1; i <= 12; i++) {
        const angle = (i - 3) * 30;
        const radius = 91;
        const x = radius * Math.cos((angle * Math.PI) / 180);
        const y = radius * Math.sin((angle * Math.PI) / 180);
        numbers.push(
          <ClockNumber
            key={i}
            style={{ left: `calc(48% + ${x}px)`, top: `calc(44% + ${y}px)` }}
          >
            {i}
          </ClockNumber>
        );
      }

      return numbers;
  };
  
  const isLoading = useSelector((store: any) => store.isLoading.isLoading);
  
  return (
    <div>
      {isLoading?
        <Isloading />
       :
        <Wrapper $hour={hour} $min={min} $sec={sec}>
          {getClockNumbers()}
          <div className="hourHand"></div>
          <div className="minHand"></div>
          <div className="secondHand"></div>
        </Wrapper>
      }
    </div>
  );
};

const Wrapper = styled.div<{ $hour: number; $min: number; $sec: number }>`
  height: 200px;
  width: 200px;
  border: 1px lightgreen solid;
  border-radius: 50%;
  position: relative;

  .hourHand {
    height: 5px;
    width: 5px;
    background-color: #ffffff;
    position: absolute;
    left: 50%;
    top: 50%;
    border-radius: 50%;
    transform: rotate(${(props) => props.$hour}deg);
    &:after {
      content: "";
      height: 60px;
      width: 15px;
      background-color: blue;
      bottom: 0;
      position: absolute;
      transform: translateX(-50%);
      border-radius: 50%;
      border: solid black 1px;
    }
  }

  .minHand {
    height: 5px;
    width: 5px;
    background-color: lightgreen;
    position: absolute;
    left: 50%;
    top: 50%;
    border-radius: 50%;
    transform: rotate(${(props) => props.$min}deg);
    &:after {
      content: "";
      height: 80px;
      width: 10px;
      border: solid black 1px;
      background-color: blue;
      bottom: 0;
      position: absolute;
      transform: translateX(-50%);
      border-radius: 50%;
    }
  }
  .secondHand {
    height: 5px;
    width: 5px;
    background-color: aliceblue;
    position: absolute;
    left: 50%;
    top: 50%;
    border-radius: 50%;
    transform: rotate(${(props) => props.$sec}deg);
    &:after {
      content: "";
      height: 80px;
      width: 2px;
      background-color: red;
      bottom: 0;
      position: absolute;
      transform: translateX(-50%);
      border-radius: 50%;
    }
  }
`;

const ClockNumber = styled.div`
  position: absolute;
  font-size: 16px;
  font-weight: bold;
  transform: translateX(-50%, -50%);

`;


// import { useEffect, useState } from "react";
// import styled from "styled-components";

// export const ClockApp = () => {
//   const [time, setTime] = useState(new Date());

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setTime(new Date());
//     }, 1000);

//     return () => clearInterval(intervalId);
//   }, []);

//   const degrees = {
//     hours: (time.getHours() % 12) * 32,
//     minutes: time.getMinutes() * 6,
//     seconds: time.getSeconds() * 6,
//   };

//   const getClockNumbers = () => {
//     const numbers = [];
//     for (let i = 1; i <= 12; i++) {
//       const angle = (i - 3) * 30;
//       const radius = 80;
//       const x = radius * Math.cos((angle * Math.PI) / 180);
//       const y = radius * Math.sin((angle * Math.PI) / 180);
//       numbers.push(
//         <ClockNumber key={i} style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}>
//           {i}
//         </ClockNumber>
//       );
//     }
//     return numbers;
//   };

//   return (

//     <ClockContainer>
//       {getClockNumbers()}
//       <HourHand degrees={degrees.hours} />
//       <MinuteHand degrees={degrees.minutes} />
//       <SecondHand degrees={degrees.seconds} />
//       <Center />
//     </ClockContainer>
//   );
// };

// const ClockContainer = styled.div`

//   width: 200px;
//   height: 200px;
//   border: 1px solid lightgreen;
//   border-radius: 50%;
//   position: relative;
// `;

// const Hand = styled.div<{ degrees: number }>`
//   position: absolute;
//   width: 1px;
//   height: 80px;
//   top: 15%;
//   left: 50%;
//   transform-origin: 0% 100%;
//   transform: translateX(-50%) rotate(${(props) => props.degrees}deg);
// `;

// const HourHand = styled(Hand)`
//   background:#350202;

//   height: 30%;
//   width: 10px;
//   top: 25%;
//   left: 50%;
//   border-radius: 30%;
// `;

// const MinuteHand = styled(Hand)`
//   background: #666;
//   width: 5px;
//   border-radius: 30%;
//   height: 70px;
//   top:20%;
//   left: 50%;
// `;

// const SecondHand = styled(Hand)`
//   background: red;

// `;

// const ClockNumber = styled.div`
//   position: absolute;
//   font-size: 16px;
//   font-weight: bold;
//   transform: translateX(-50%) translateY(-50%);
// `;
// const Center = styled.div`
//     width: 10px;
//     height: 10px;
//     background: #fcfbfb;
//     border-radius: 50%;
//     position: absolute;
//     left: 47%;
//     top: 49%;
// `
