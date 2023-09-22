
import styled from "styled-components";

export const CostsFilter = (props:any) => {

    const yearChangeHandler = (event:any) => {
        props.onChangeYear(event.target.value);
    };

    return (
        <Wrapper>
            <div className="costs-filter">
            <div className="costs-filter__control">
                <label>Choose year</label>
                <select value={props.year} onChange={yearChangeHandler}>
                    <option value="All years">All years</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                </select>
            </div>
            </div>
        </Wrapper>
    );
};


const Wrapper = styled.div`
.costs-filter {
    color: white;
    padding: 0 1rem;
}

.costs-filter__control {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    margin: 1rem 0;
}

.costs-filter label {
    font-weight: bold;
    margin-bottom: 0.5rem;
}

.costs-filter select {
    font: inherit;
    padding: 0.5rem 3rem;
    font-weight: bold;
    border-radius: 6px;
}
`