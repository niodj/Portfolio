import React from 'react';
import {useParams, useSearchParams} from "react-router-dom";
import styled from "styled-components";


export const UseParamsApp = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    console.log(searchParams.get('name'), searchParams.get('age'));
//http://localhost:3000/?name=gf&age=33

    //////show params for adressline
    const params = useParams<'*'>();
    const some = params["*"]
    console.log(some);
////////http://localhost:3000/param1/param2/...

        return <Wrapper>
       <h3>Here you can enter some params in address line and they would be show here</h3>

<h4>Variant1 - fixed params name and age</h4>
Enter in adress line: http://localhost:3000/UseParamsApp?name=Anton&age=37

            <p>Your var.1 params will be here</p>
            <div>Name: {searchParams.get('name')}</div>
            <div>Age: {searchParams.get('age')}</div>
----------------------------------------------------------
            <h4>Variant2 - any params</h4>
            Enter in adress line: http://localhost:3000/UseParamsApp/my name is Anton and i am 37 years old

            <div>Your var.2 params will be here: {some}</div>


    </Wrapper>
}
const Wrapper = styled.div`

margin: 20px;

  & > div {
    display: flex;
    flex-direction: column;
    margin: 20px;
  font-weight: bold;
  }

`