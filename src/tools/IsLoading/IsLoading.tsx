
import styled from "styled-components";


export const Isloading = () => {

  return (
    <Wrapper>
      <img
        className="loader1"
        src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .loader1 {
    margin-top: 75px;
  }
`;
