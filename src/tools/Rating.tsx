import React, {useEffect, useState} from "react";
import axios from "axios";
import styled from "styled-components";


export const Rating = () => {
    const [codewars, setCodewars] = useState<any>()

    const [forGithub, setForGithub] = useState(0)
    const [forLinkidin, setForinkidin] = useState(0)
    const ghday = () => {
        let targetDate = new Date('2022-12-15');
        let currentDate = new Date();
        const timeDifference: number = currentDate.getTime() - targetDate.getTime();
        setForGithub(Math.floor(timeDifference / (1000 * 60 * 60 * 24)))
        setForinkidin(Math.floor(timeDifference / (1000 * 60 * 60 * 24))-180)
    }

    useEffect(() => {
        axios.get<any>('https://www.codewars.com/api/v1/users/niodj').then(response => {
            setCodewars(response.data);
            ghday()
        })
    }, []);
    if (!codewars) {
        return null
    }
    return <Wrapper>
        <table>
            <thead>
            <tr>
                <th>Started develop 2016</th>
                <th>Score</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>
                    <Ico
                        src={'https://codeberg.org/repo-avatars/00a02c9104e0ddad1081d458d493702a701ac257d2120c2c56aacd23f78a1045'}></Ico><Link
                    href='https://www.codewars.com/users/niodj' target="_blank">CodeWars
                    (TypeScript)
                </Link>
                </td>
                <td>{codewars?.ranks.overall.score} / 3218</td>
            </tr>
            <tr>
                <td>
                    <Ico
                        src={'https://images.crunchbase.com/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/ikqra03zdnggljdu5vv0'}></Ico>
                    <Link href='https://www.freecodecamp.org/niodj' target="_blank">freecodecamp
                        (JavaScript)
                    </Link>
                </td>
                <td>294 / 307</td>
            </tr>
            <tr>
                <td>
                    <Ico
                        src={'https://images.crunchbase.com/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/ikqra03zdnggljdu5vv0'}></Ico>
                    <Link href={'https://www.freecodecamp.org/niodj'} target="_blank">freecodecamp
                        (HTML+CSS)
                    </Link>
                </td>
                <td>437 / 1239</td>
            </tr>
            <tr>
                <td>
                    <Ico
                        src={'https://cdn3.iconfinder.com/data/icons/social-network-round-gloss-shine/256/GitHub_Social-Network-Communicate-Page-Curl-Effect-Circle-Glossy-Shadow-Shine.png'}></Ico>
                    <Link href='https://github.com/niodj' target="_blank">GitHub (commits)
                    </Link>
                </td>
                <td>{forGithub} </td>
            </tr>
            <tr>
                <td>
                    <Ico
                        src={'https://png1.12png.com/t/1/22/5/t1zUpLsiNV/brand-symbol-text-social-media-linkedin.jpg'}></Ico>
                    <Link href='https://www.linkedin.com/in/niodj/' target="_blank">Linkedin
                    </Link>
                </td>
                <td>{forLinkidin} </td>
            </tr>
            </tbody>
        </table>


    </Wrapper>

}

const Wrapper = styled.div`
  margin-bottom: 9px;
    table {
    border-collapse: collapse;
    border: 1px solid grey;
    text-align: left;
    border-spacing: 0; 
    
    
      
  }

  th, td {
    border: 1px solid green;
    padding-right: 10px; /* Укорачиваем до одного свойства для удобства */
    padding-left: 10px; /* Укорачиваем до одного свойства для удобства */

  }

  background-color: rgba(255, 255, 255, 0.5)
`;


const Ico = styled.img`
  width: 25px;

`

const Link = styled.a`
  vertical-align: top;
  margin-left: 5px;
`