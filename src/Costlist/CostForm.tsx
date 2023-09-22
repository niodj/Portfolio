import React, {useState} from "react";
import styled from "styled-components";
import {Button} from "@mui/material";

export const CostForm = (props: any) => {
    const [inputDescription, setInputDescription] = useState("");
    const nameChangeHandler = (event: any) => {
        setInputDescription(event.target.value);
    };

    const [inputAmount, setInputAmount] = useState("");
    const amountChangeHandler = (event: any) => {
        setInputAmount(event.target.value.replace(/[^0-9]/g, ''))
    };

    const submitHandler = (event: any) => {
        event.preventDefault();
        if(inputDescription){

        const costData = {
            id: Date.now(),
            description: inputDescription,
            amount: inputAmount?inputAmount:0,
            date: new Date(props.inputDate)
        };
        props.addCostHandler(costData);
        setInputDescription('')
        setInputAmount('')
    }else {alert('empty name')}}

    return (
        <Wrapper>
            <form onSubmit={submitHandler}>
                <div>
                    <label>Name</label>
                    <NameInput
                        value={inputDescription}
                        onChange={nameChangeHandler}
                    ></NameInput>
                    </div>
                <Other>
                <div>
                    <label>Amount</label>
                    <input
                        min="0"
                        step="0.01"
                        value={inputAmount}
                        onChange={amountChangeHandler}
                    ></input>
                </div>
                <div><label>Date</label>
                    <input
                        type="date"
                        value={props.inputDate}
                        onChange={props.dateChangeHandler}
                    ></input>
                </div>
                <Button variant={"outlined"} type="submit">
                    Add
                </Button>
                </Other>
            </form>
        </Wrapper>
    );
};

const Wrapper = styled.div`
  width: 75%;
  form {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    font: inherit;
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    
  }
  input {margin: 20px }
  margin: 10px;
 
`
const NameInput = styled.input`

width: 80%;
`
const Other =styled.div`
display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
 
`
