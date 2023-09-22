import styled from "styled-components";


export const Header = () =>{

    return(
        <Wrapper>
        <img src={"https://pluspng.com/img-png/autodesk-logo-png-autodesk-unveils-complete-manufacturing-software-portfolio-tct-magazine-2272.png"}/>

            <div className="loading">Component in development...</div></Wrapper>
    )
}

const Wrapper = styled.div`
display: flex;
  flex-direction: column;
  background-color: blue;
  img{width: 100px}
  color: white;
  @keyframes fadeIn {
    0% { opacity: 0 }
    100% { opacity: 1 }
  }
  .loading {
    font-weight: bold;
    display:inline-block;
    font-family: monospace;
    font-size: 15px;
    clip-path: inset(0 3ch 0 0);
    animation: l 3s steps(4) infinite;
  }

  @keyframes l {
    to {
      clip-path: inset(0 -1ch 0 0)
    }
  }
`
