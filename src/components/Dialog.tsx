import styled from "styled-components";

export const Dialog = (props:any) => {

    return (
        <Wrapper>{props.name}</Wrapper>
    )
}

const Wrapper = styled.div`
  margin-left: 20px;
  background: blue;
`
