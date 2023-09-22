import {ButtonQ} from "./ButtonQ";
import styled from "styled-components";


type PropsType = {
    min: string
    max: string
    setMinHandler:any
    setMaxHandler:any
    setCounterHandler:any
    buttonSetState:any
    message:string
}

export const Setting = (props: PropsType) => {

    return <Wrapper>
        <Item $message={props.message}>Start value</Item>
            <InputItem  min='0'  value={props.min} onChange={(event)=>props.setMinHandler(event)} />
        <Item $message={props.message}>Max value</Item>
            <InputItem min='0'  value={props.max} onChange={(event)=>props.setMaxHandler(event)} />
        <SetButton>
        <ButtonQ name={'Set'} buttonFunction={props.setCounterHandler} ifActiveButton={props.buttonSetState}></ButtonQ>
        </SetButton>
        </Wrapper>
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 86%;
  border: solid lightblue;
  margin: 10px;
  
`

const Item = styled.div<{$message:string}>`
  background-color: ${(props:{$message:string}) => (props.$message==='Incorrect input' ? "red":"white")};
  margin-top: 20px;
  color: navy;
`

const InputItem = styled.input`
  width: 100px;
  
 
`

const SetButton = styled.div`
  margin-top: 7px;
  color: white;
`