
import styled from "styled-components";

export const CostDate = (props:any) => {
    const month = (new Date(props.date)).toLocaleString("en-En", { month: "long" })
    const year = (new Date(props.date)).getFullYear()
    const day = (new Date(props.date)).toLocaleString("en-En", { day: "2-digit" });
    return (
        <Wrapper>
            <div className="cost-date">
            <div className="cost-date__month">{month}</div>
            <div className="cost-date__day">{day}</div>
            <div className="cost-date__year">{year}</div>
            </div>
        </Wrapper>
    );
}
const Wrapper = styled.div`
.cost-date {
  display: flex;
    flex-direction: column;
    width: 5.5rem;
    height: 5.5rem;
    border: 1px solid #ececec;
    background-color: #2a5b84;
    color: #fefae1;
    border-radius: 12px;
    align-items: center;
    justify-content: center;
}

.cost-date__month {
    font-size: 0.75rem;
    font-weight: bold;
}

.cost-date__year {
    font-size: 0.75rem;
}

.cost-date__day {
    font-size: 1.5rem;
    font-weight: bold;
}
`