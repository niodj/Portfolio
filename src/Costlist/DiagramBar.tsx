import styled from "styled-components";


export const DiagramBar = (props:any) => {

    let barFillHeight = '0%';

    if (props.maxValue > 0) {
        barFillHeight = Math.round(props.value / props.maxValue * 100) + '%';
    }

    return (
        <Wrapper>
            <div className="diagram-bar__inner">
                <div
                    className="diagram-bar__fill"
                    style={{
                        height: barFillHeight
                    }}
                ></div>
            </div>
            <div className="diagram-bar__label">{props.label}</div>

            </Wrapper>
    );
};

const Wrapper = styled.div`

  .diagram-bar__inner {
    height: 100%;
    width: 100%;
    border: 1px solid #313131;
    border-radius: 12px;
    background-color: #fefae1;
    
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .diagram-bar__fill {
    background-color: #bd8025;
    width: 100%;
    transition: all 0.3s ease-out;
  }

  .diagram-bar__label {
    font-weight: bold;
    font-size: 0.5rem;
    text-align: center;
  }
`

