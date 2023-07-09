import React, { useState } from "react";
import styled from "styled-components";

export const OnOff = () => {
    const [toggle, setToggle] = useState(false);

    return (
        <div>

            <Title>On/Off</Title>
        <Wrapper>
            <On onClick={() => setToggle(true)} toggle={toggle}>On</On>
            <Off onClick={() => setToggle(false)} toggle={toggle}>Off</Off>
            <LampContainer toggle={toggle}>
                 <div> {toggle ? <RotatingDiv>Work</RotatingDiv> : 'Stoped'  }  </div>
            </LampContainer>
        </Wrapper>
        </div>
    );
};

const Title=styled.div`
  display: flex;
  justify-content: center;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const On = styled.button<{ toggle:boolean }>`
  width: 100px;
  height: 50px;
  margin-right: 30px;
  margin-left: 30px;
  background: ${(props) => (props.toggle ? "lightgreen" : "grey")};
  border: none;
  &:hover {
    border: 2px solid yellow;
  }

`;

const Off = styled.button <{toggle:boolean}>`
  width: 100px;
  height: 50px;
  background: ${(props) => (props.toggle ? "grey":"red")};
  border: none;
  &:hover {
    border: 2px solid yellow;
  }
`;

const LampContainer = styled.div<{ toggle:boolean }>`
  width: 100px;
  height: 50px;
  margin-left: 30px;
  border-radius: 50px;
  background: ${(props) => (props.toggle ? "lightgreen" : "grey")};
  display: flex;
  justify-content: center;
  align-items: center;
  border: black solid 5px;
  position: relative;
`;

const RotatingDiv = styled.div`
  background-color: lightgreen;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: rotation 1s infinite linear;
  @keyframes rotation {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
    `
