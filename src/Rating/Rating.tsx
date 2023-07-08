import {useState} from "react";
import styled from "styled-components";

const RATINGS = [1, 2, 3];

export function Rating(props: any) {
    const [selectedRating, setSelectedRating] = useState(0)

       return (
        <div className='App'>
            {RATINGS.map(rating => (
                <Star selected={rating<=selectedRating} key={rating} onClick={() => setSelectedRating(rating)}>Star</Star>
            ))}
        </div>
    );
}

const Star = styled.span<{selected:boolean}>`
  
  ${(props) => (props.selected && 'font-weight: bold')};
`
