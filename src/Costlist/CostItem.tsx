
import styled from "styled-components";
import React from "react";
import {CostDate} from "./CostDate";
import {Card} from "./Card";
import {Button} from "@mui/material";
import {EditableSpan} from "../tools/EditableSpan";



export const CostItem = (props:any) => {

    const editButtonClick = () => {
        const newDescription = window.prompt(
            "Введите новое описание:"
        );
        if (newDescription !== null) {
            props.editCostHadler({
                id: props.id,
                description: newDescription
            });
        }
    };

    const removeButtonClick = () => {
        props.removeCostHandler(props.id)
    }


    return (
      <Wrapper>
        <CostDate date={props.date} />
        <Block2>
          <Description>
            <EditableSpan value={props.description} />
          </Description>

          <Price>
            <EditableSpan value={"$" + props.amount} />
          </Price>
          <div>
            <Button variant={"contained"} onClick={removeButtonClick}>
              Remove
            </Button>
          </div>
        </Block2>
      </Wrapper>
    );
};

const Wrapper = styled.div`
  display: flex;
  padding: 0.5rem;
  margin: 1rem 0;
  background-color: #bd8025;
  color: #fefae1;
  border-radius: 10px;
  box-shadow: 0 1px 7px rbga(0, 0, 0, 0.25);
  justify-content: space-between;
  button{margin: 10px 0px 0px 10px }
  align-items: center;
`
const Block2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`
const Description = styled.div`
    font-weight: bold;
  margin-bottom: 10px;
  font-size: 20px;
`

const Price = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: #fefae1;
  background-color: #2a5b84;
  border: 1px solid white;
  padding: 0.5rem;
  border-radius: 12px;

`