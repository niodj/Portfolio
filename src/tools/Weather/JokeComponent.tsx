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




  //  axios.get("https://v2.jokeapi.dev/joke/Programming?type=single")
  //  axios.get("https://v2.jokeapi.dev/joke/Programming?type=single")
  //    .then(console.log);

  // Promise.all([response, response2] if one of promise was reject -  returns reject
  //   const otherPromise = Promise.all([response, response2]);
  //     otherPromise
    //       .then((results) => {
    //         console.log(results);
    //         console.log(response);
    //         console.log(response2);
    //         console.log("finally");
    //       })
    //       .catch((error) => {
    //         console.log('try later');
    //       });
    // };

    // Promise.allSettled([response, response2] will resolve or reject separate
    // const otherPromise2 = Promise.allSettled([response, response2])
    //   .then((results) => {
    //     console.log(results);
    //   })

    // const promiseResolve = Promise.resolve(100);
    // const promiseReject = Promise.reject('error');




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
  cursor: default;
  text-decoration: underline;

  &:hover {
    font-size:large;
  }
`;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { styled } from "styled-components";

// export const JokeComponent = () => {
//   const [joke, setJoke] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   const fetchJoke = async () => {
//     try {
//       const response = await axios.get<any>(
//         "https://v2.jokeapi.dev/joke/Programming?type=single"
//       );
//       setJoke(response.data.joke);
//       setLoading(false);
//     } catch (error) {
//       setError("An error occurred while fetching the joke.");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const loadingTimeout = setTimeout(() => {
//       fetchJoke();
//     }, 5000);

//     return () => clearTimeout(loadingTimeout);
//   }, []);

//   return (
//     <Wrapper>
//       {loading ? (
//         <p>Loading joke...</p>
//       ) : error ? (
//         <p>Error: {error}</p>
//       ) : (
//         <div>
//           <div onClick={fetchJoke}>{joke ? joke : "No joke available."}</div>
//         </div>
//       )}
//     </Wrapper>
//   );
// };

// const Wrapper = styled.div`
//   cursor: default;
//   text-decoration: underline;

//   &:hover {
//     font-size: large;
//   }
// `;