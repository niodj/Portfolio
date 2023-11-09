import React from "react"

type PropsType = {
    name:string
    buttonFunction:()=>void
    ifActiveButton:boolean
}
export const ButtonQ = React.memo( (props:PropsType)=>{

    return <>
            <button onClick={()=>props.buttonFunction()} disabled={!props.ifActiveButton}> {props.name}</button>
    </>
})

