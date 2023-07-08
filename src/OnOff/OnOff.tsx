import { useState } from "react";
import styled from "styled-components";

export const OnOff = () => {
    const [toggle, setToggle] = useState(false);

    return (
        <Wrapper>
            <On onClick={() => setToggle(true)} toggle={toggle}>Вкл</On>
            <Off onClick={() => setToggle(false)} toggle={toggle}>Выкл</Off>
            <Lamp toggle={toggle}>
                <CenterText> {toggle ? 'Работает' : 'Не работает'  }  </CenterText>
            </Lamp>
        </Wrapper>
    );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const On = styled.button<{ toggle:boolean }>`
  width: 100px;
  height: 50px;
  margin: 30px;
  background: ${(props) => (props.toggle ? "green" : "grey")};
`;

const Off = styled.button <{toggle:boolean}>`
  width: 100px;
  height: 50px;
  margin: 30px;
  background: ${(props) => (props.toggle ? "grey":"red")};
`;

const Lamp = styled.div<{ toggle:boolean }>`
  width: 200px;
  height: 100px;
  margin: 30px;
  border-radius: 50px;
  background: ${(props) => (props.toggle ? "green" : "grey")};
  display: flex;
  justify-content: center;
  align-items: center;
  border: black solid 5px;
`;

const CenterText =styled.p`

  
  
`