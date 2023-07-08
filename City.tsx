import React from 'react';
import {CurrentBankomat} from "./CurrentBankomat";
import {MoneyType} from "./RubDollarApp";
import styled from "styled-components";

type CityPropsType = {
    filteredMoney: MoneyType[] //встречаем денюжки
}

export const City = (props: CityPropsType) => {

    const mapData = props.filteredMoney.map((item,idx) => (
        <CurrentBankomat
            key={idx}
            item={item}
           />
        ))

    return <div>
        <Wrapper>{mapData}</Wrapper>
        </div>
    };

const Wrapper = styled.div`
display:flex;
flex-direction: row;
flex-size: 38px;

`;