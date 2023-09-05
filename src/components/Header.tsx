import styled from "styled-components";


export const Header = () =>{

    return(
        <Wrapper>Header
        <img src={"https://pluspng.com/img-png/autodesk-logo-png-autodesk-unveils-complete-manufacturing-software-portfolio-tct-magazine-2272.png"}/>
        </Wrapper>
    )
}

const Wrapper = styled.div`
display: flex;
  background-color: blue;
  img{width: 100px}
`
