import React from 'react';
import {City} from "./City";
import {BanknotsType, MoneyType} from "./RubDollarApp";

type CountryPropsType = {
    filteredMoney: MoneyType[]
    setFilterValue: (filterValue:BanknotsType)=>void // давайте подумаем, setFilter -это гоузчик, у которого всегда в руках товар
  }

export const Country = (props: CountryPropsType) => {
    const setAll = () => {
        props.setFilterValue('All')
    }

    const setDollars = () => {
        props.setFilterValue('Dollars')
    }

    const setRUBLS = () => {
        props.setFilterValue('RUBLS')
    }

    return (
        <div>
            <button onClick={()=>{setAll()}}>All</button>
            <button onClick={()=>{setDollars()}}>Dollars</button>
            <button onClick={()=>{setRUBLS()}}>RUBLS</button>
            <City filteredMoney={props.filteredMoney}/>
        </div>
    );
};

