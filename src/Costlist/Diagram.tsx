import {DiagramBar} from "./DiagramBar";
import styled from "styled-components";


export const Diagram = (props:any) => {

    const dataSetsValues = props.dataSets.map((dataSet: { value: any; }) => dataSet.value);

    const maxMonthCosts = Math.max(...dataSetsValues);

    return (
        <Wrapper>

            {props.dataSets.map((dataSet:any) => (
                <DiagramBar
                    key={dataSet.label}
                    value={dataSet.value}
                    maxValue={maxMonthCosts}
                    label={dataSet.label}
                />
            ))}

        </Wrapper>
    );
}

const Wrapper = styled.div`
  padding: 1rem;
  border-radius: 0px;
  background-color: #ebc137;
  text-align: center;
  display: flex;
  justify-content: space-around;
  height: 10rem;
`