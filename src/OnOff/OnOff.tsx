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
            <Lamp toggle={toggle}>
                <CenterText> {toggle ? 'Work' : 'Stoped'  }  </CenterText>
            </Lamp>
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
  background: ${(props) => (props.toggle ? "green" : "grey")};
`;

const Off = styled.button <{toggle:boolean}>`
  width: 100px;
  height: 50px;
  background: ${(props) => (props.toggle ? "grey":"red")};

`;

const Lamp = styled.div<{ toggle:boolean }>`
  width: 100px;
  height: 50px;
  margin-left: 30px;
  border-radius: 50px;
  background: ${(props) => (props.toggle ? "green" : "grey")};
  display: flex;
  justify-content: center;
  align-items: center;
  border: black solid 5px;
`;

const CenterText =styled.p`

  
  
`