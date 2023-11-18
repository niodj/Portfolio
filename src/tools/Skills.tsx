import React from "react";
import styled from "styled-components";


export const Skills = () => {

    return (
      <Wrapper>
        <table>
          <thead>
            <tr>
              <th>Here used</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Typescrypt</td>
            </tr>
            <tr>
              <td>Redux/Redux Toolkit</td>
            </tr>
            <tr>
              <td>Node.js/Express</td>
            </tr>
            <tr>
              <td>PHP</td>
            </tr>
            <tr>
              <td>AWS Linux 2023</td>
            </tr>
            <tr>
              <td>MongoDB</td>
            </tr>
            <tr>
              <td>SQL</td>
            </tr>
            <tr>
              <td>Cors</td>
            </tr>
            <tr>
              <td>Context API</td>
            </tr>
            <tr>
              <td>react-router-dom</td>
            </tr>
            <tr>
              <td>Axios</td>
            </tr>
            <tr>
              <td>Promises</td>
            </tr>
            <tr>
              <td>localStorage</td>
            </tr>
            <tr>
              <td>React.memo</td>
            </tr>
            <tr>
              <td>useMemo</td>
            </tr>
            <tr>
              <td>useCallback</td>
            </tr>
            <tr>
              <td>useEffect</td>
            </tr>
            <tr>
              <td>useState</td>
            </tr>
            <tr>
              <td>useResize</td>
            </tr>
            <tr>
              <td>useParam</td>
            </tr>
            <tr>
              <td>customHooks</td>
            </tr>
            <tr>
              <td>storybook</td>
            </tr>
            <tr>
              <td>GitHub</td>
            </tr>
            <tr>
              <td>map|filer|find</td>
            </tr>
            <tr>
              <td>Set()</td>
            </tr>
            <tr>
              <td>SpeechSynthesis</td>
            </tr>
            <tr>
              <td>Styled Component</td>
            </tr>
            <tr>
              <td>SCSS</td>
            </tr>
            <tr>
              <td>Animation</td>
            </tr>
            <tr>
              <td>EditableSpan</td>
            </tr>
            <tr>
              <td>Table</td>
            </tr>
            <tr>
              <td>Date()</td>
            </tr>
            <tr>
              <td>setInterval()</td>
            </tr>
            <tr>
              <td>Math()</td>
            </tr>
          </tbody>
        </table>
      </Wrapper>
    );
}

const Wrapper = styled.div`
  height: 175px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  table{
    border-spacing: 5px;
    padding-right: 5px;
    padding-left: 5px;
  }
  td {
    border-collapse: collapse;
    border-bottom: solid 1px green;
  }

`