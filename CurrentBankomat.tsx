import React from 'react';
import {MoneyType} from "./RubDollarApp";
import styled from "styled-components";

type CurrentBankomatPropsType = {
    item: MoneyType
}
export const CurrentBankomat = (props:CurrentBankomatPropsType) => {

    return (
      <Banknote color={props.item.banknotes==='Dollars' ? 'green' : 'blue'}>
            <Name>{props.item.banknotes}</Name>
            <Value>{props.item.value}</Value>
            </Banknote>
        );
};

const Banknote = styled.div`
  background-color: ${props=> props.color}; 
    width: 400px;
    height: 200px;
    margin: 10px;
`
const Name = styled.div`
display: flex;
  justify-content: center;
  font-size: 30px;
`

const Value = styled.div`
display: flex;
  justify-content: center;
  font-size: 30px;
  margin-top: 30px;
  font-size: 90px;
`