import {Buttons} from "./Buttons";
import React from "react";
import styled from "styled-components";

type PropsType = {
    count: number
    ifRedCount: boolean
}

export const Counter = React.memo((props: PropsType) => {
  return (
    <Wrapper>
      <Count $ifRedCount={props.ifRedCount}>{props.count}</Count>
    </Wrapper>
  );
});
const Count = styled.div<{ $ifRedCount: boolean }>`
  color: ${(props: { $ifRedCount: boolean }) => (!props.$ifRedCount ? "lightgreen" : "red")};
`

const Wrapper = styled.div`
  font-size: 50px;
  font-weight: bold;

`