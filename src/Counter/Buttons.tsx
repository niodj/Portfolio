import { ButtonQ } from "./ButtonQ";
import React from "react";
import styled from "styled-components";

type PropsType = {
    addCount: () => void;
    ifActiveIncButton: boolean;
    ifActiveResetButton: boolean;
    resetCount: () => void;
};

export const Buttons = React.memo((props: PropsType) => {
    return (
        <Wrapper>
            <ButtonWrapper>
                <ButtonQ
                    name={"inc"}
                    buttonFunction={props.addCount}
                    ifActiveButton={props.ifActiveIncButton}
                />
            </ButtonWrapper>
            <ButtonWrapper>
                <ButtonQ
                    name={"resetCount"}
                    buttonFunction={props.resetCount}
                    ifActiveButton={props.ifActiveResetButton}
                />
            </ButtonWrapper>
        </Wrapper>
    );
})

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const ButtonWrapper = styled.div`
  margin-left: 35px;
  margin-right: 35px;
`;