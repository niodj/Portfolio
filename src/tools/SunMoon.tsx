import { useSelector } from "react-redux";
import styled from "styled-components";
import { StoreType } from "../state";

export const SunMoon = () => {
  const dark = useSelector((state:StoreType)=>state.dark.dark)
  return (
    <RotatingDiv $dark={dark}>
      <img
        className='imgdark'
        src='https://www.pngarts.com/files/2/Full-Moon-PNG-Image.png'
        alt='Moon'
      />
      <img
        className='imgnodark'
        src='https://sunveter.ru/uploads/posts/2015-07/thumbs/1437676158_12.png'
        alt='Moon'
      />
    </RotatingDiv>
  );
};

const RotatingDiv = styled.div<{$dark:boolean}>`
  margin-bottom: -50px;
  animation: rotation 70s infinite linear;
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }


  .imgdark {
   position: absolute;
    width: 200px;
    height: 200px;
    transition: opacity 6s ease-in-out; /* Плавное изменение opacity */
    opacity: ${(props) => (props.$dark ? 1 : 0)}; /* Прозрачность зависит от props.dark */
  }

  .imgnodark {

    width: 200px;
    height: 200px;
    transition: opacity 6s ease-in-out; /* Плавное изменение opacity */
    opacity: ${(props) => (props.$dark ? 0 : 1)}; /* Прозрачность инвертирована относительно props.dark */
  }
`;
