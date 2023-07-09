import {useState} from "react";
import styled from "styled-components";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

const RATINGS = [ 1, 2, 3, 4, 5];

export function Rating() {
    const [selectedRating, setSelectedRating] = useState(0)

       return (
        <div className='App'>
            <div>My rating {selectedRating}. Choose by words</div>
                     <div>
                        {RATINGS.map(item => (
                <Star selected={item<=selectedRating} key={item} onClick={() => setSelectedRating(item)}>Star </Star>
            ))}
            </div>
            <div>or here</div>
            <div>
                {RATINGS.map(item => (
                    <span key={item} onClick={() => setSelectedRating(item)}> {item<=selectedRating? <AiFillStar /> : <AiOutlineStar />} </span>
                ))}
            </div>
        </div>
    );
}

const Star = styled.span<{selected:boolean}>`
  
  ${(props) => (props.selected ? 'font-weight: bold':null)};
`
