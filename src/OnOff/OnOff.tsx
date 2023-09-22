import styled from "styled-components";

export const OnOff = (props: any) => {
    return (
        <RotatingDiv $dark={props.dark}>

            <img
                className='imgdark'
                src="https://www.pngarts.com/files/2/Full-Moon-PNG-Image.png"
                alt="Moon"
            />
            <img
                className='imgnodark'
                src="https://sunveter.ru/uploads/posts/2015-07/thumbs/1437676158_12.png"
                alt="Moon"
            />
        </RotatingDiv>
    );
};

const RotatingDiv = styled.div<{$dark:boolean}>`
  
  animation: rotation 50s infinite linear;
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .imgdark {
    
    width: 100px;
    height: 100px;
    transition: opacity 6s ease-in-out; /* Плавное изменение opacity */
    opacity: ${(props) => (props.$dark ? 1 : 0)}; /* Прозрачность зависит от props.dark */
  }

  .imgnodark {
    width: 100px;
    height: 100px;
    transition: opacity 6s ease-in-out; /* Плавное изменение opacity */
    opacity: ${(props) => (props.$dark ? 0 : 1)}; /* Прозрачность инвертирована относительно props.dark */
  }
`;
