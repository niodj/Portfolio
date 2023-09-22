import React, {useState} from "react";
import styled from "styled-components";
import {Card} from "./Card";
import {CostsFilter} from "./CostsFilter";
import {CostList} from "./CostList";
import {CostDiagram} from "./CostDiagram";


export const Costs = (props: any) => {

    const [year, setYear] = useState("All years");

    const onChangeYear = (year: any) => {
        setYear(year);
    };

    let filteredCosts
    if (year === 'All years') {
        filteredCosts = props.costs
    } else {
        filteredCosts = props.costs.filter((cost: any) => {
            return (new Date(cost.date)).getFullYear().toString() === year;
        });
    }


    return (
        <Wrapper>

            <Card>
                <CostsFilter onChangeYear={onChangeYear} year={year}/>
                <CostDiagram costs={filteredCosts}/>
                <p>Double click to edit</p>
                <CostList
                    costs={filteredCosts}
                    editCostHadler={props.editCostHadler}
                    removeCostHandler={props.removeCostHandler}
                />
            </Card>
        </Wrapper>
    );
}

const Wrapper = styled.div`
  padding: 1rem;
  background-color: #aac4d1;
  margin: 2rem auto;
  width: 70%;

`
