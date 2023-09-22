import {CostItem} from "./CostItem";
import styled from "styled-components";

export const CostList = (props:any) => {



    return (
        <div>
            {props.costs.map((cost:any) => (
                <CostItem
                    key={cost.id}
                    date={cost.date}
                    description={cost.description}
                    amount={cost.amount}
                    editCostHadler={props.editCostHadler}
                    id={cost.id}
                    removeCostHandler={props.removeCostHandler}
                />
            ))}
        </div>
    );
}