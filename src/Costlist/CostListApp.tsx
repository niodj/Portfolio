import React, { useState, useEffect } from "react";
import { CostForm } from "./CostForm";
import { Costs } from "./Costs";
import styled from "styled-components";
import { v1 } from "uuid";

export const CostListApp = () => {
   

        let currentYear = (new Date().getFullYear()).toString();
        let currentMonth = (new Date().getMonth() + 1).toString(); // Месяцы в JavaScript нумеруются с 0, поэтому добавляем 1
        let currentDay = (new Date().getDate()).toString();
        if (currentMonth.length === 1) {
            currentMonth = "0" + currentMonth;
        }
        if (currentDay.length === 1) {
            currentDay = "0" + currentDay;
        }

        const convDate = currentYear + "-" + currentMonth + "-" + currentDay

        const [costs, setCosts] = useState<any>([]);
        const [inputDate, setInputDate] = useState(convDate);


        useEffect(() => {
            const savedCosts = localStorage.getItem("costs");
            if (savedCosts) {
                setCosts(JSON.parse(savedCosts))
            }
        }, []);


        useEffect(() => {
            localStorage.setItem("costs", JSON.stringify(costs));
        }, [costs]);

        const addCostHandler = (costData: any) => {
            setCosts([{ id: v1(), date: (new Date(inputDate)).toString(), description: costData.description, amount: costData.amount }, ...costs]);
        };

        const dateChangeHandler = (event: any) => {
            setInputDate(event.target.value)
        };
        const editCostHandler = (costData: any) => {
            setCosts(costs.map((item: { id: any; }) => {
                if (item.id === costData.id) {
                    return { ...item, ...costData };
                }
                return item;
            }));
        };

        const removeCostHandler = (costId: any) => {
            setCosts(costs.filter((item: { id: any; }) => item.id !== costId));
        };

        return (
            <Wrapper>
                <h3>Cost list component</h3>
                <CostForm addCostHandler={addCostHandler} inputDate={inputDate} setInputDate={setInputDate} dateChangeHandler={dateChangeHandler} />
                <Costs
                    costs={costs}
                    editCostHandler={editCostHandler}
                    removeCostHandler={removeCostHandler}
                />
            </Wrapper>
        );
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
