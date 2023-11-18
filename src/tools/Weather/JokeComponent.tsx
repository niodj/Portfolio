import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "styled-components";

export const JokeComponent = React.memo(() => {

  const [loading, setLoading] = useState<boolean>(true);
const [joke, setJoke] = useState<string | null>(null);
const [error, setError] = useState<string | null>(null);



const fetchJoke = async () => {
  try {
    const response = await axios.get(
      "https://v2.jokeapi.dev/joke/Programming?type=single"
    );
    setJoke(response.data.joke);
    setLoading(false);
  } catch (error) {
    error instanceof Error
      ? setError(error.message)
      : setError("An error occurred.");
    setLoading(false);
  }
}

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      fetchJoke();

    }, 3000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  return (
    <Wrapper>
      {loading ? (
        <p>Loading joke...</p>
      ) : error ? (
          <p>Error: { error }</p>
      ) : (
        <div>
          <div onClick={fetchJoke}>{joke ? joke : "No joke available."}</div>
        </div>
      )}
    </Wrapper>
  );
});

const Wrapper = styled.div`
margin: 20px;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    font-size:large;
  }
`;
