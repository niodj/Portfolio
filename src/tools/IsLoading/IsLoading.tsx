
import { ThunkDispatch } from "redux-thunk";
import styled from "styled-components";
import { RootAction, StoreType } from "../../state";
import { useDispatch } from "react-redux";
import { useEffect } from "react";



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
