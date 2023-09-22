import styled from "styled-components";


export const Card = (props:any) => {
    const classes = "card " + props.className;
    return <Wrapper> <div className={classes}>{ props.children}</div></Wrapper>
}

const Wrapper = styled.div`
  .card {
    display: flex;
    flex-direction: column;
    
    border-radius: 10px;
    box-shadow: 0 1px 7px rbga(0,0,0,0.25);
  }

`
