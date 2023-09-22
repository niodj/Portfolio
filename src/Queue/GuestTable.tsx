import {v1} from "uuid";
import styled from "styled-components";
import {useState} from "react";


export const GuestTable = (props:any)=>{
const departments = props.queueWindow.map((item: { department: any })=>item.department)

    const [phoneNumber, setPhoneNumber] = useState(null)



    // @ts-ignore
    let uniqueItems = [...new Set(departments)]
    return (
        <Wrapper>
            <h3>Guest Table</h3>
            <div>This page displays for client's tablet on reception. <div>Here guests can choose a service and get number in the queue (take a picture, print, receive message to whatsApp,QR code... )</div>
            </div>
            <div>Choose service</div>
            <ButtonWrapper>
            {uniqueItems.map((item:any, idx:number)=><GuestButton key={idx}><button onClick={()=>props.addToWating(item)}>{item}</button></GuestButton>)}
            </ButtonWrapper>


        </Wrapper>
    )
}

const Wrapper = styled.div`
text-align: center;

  button{
    width: auto;
    height: 50px;
    border-radius: 20px;
    background: lightblue;
    
  }
`

const GuestButton = styled.div`
margin: 20px;
  
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  
`