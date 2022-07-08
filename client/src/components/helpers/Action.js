import {useState} from "react";
import styled from 'styled-components';
import UnstyledButton from "./LikeButton/UnstyledButton";

const Action = ({ color, size, children, onClickFunc }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Wrapper
      onClick={onClickFunc}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      circleColor={color}
      style={{ width: size, height: size, color: isHovered ? color : null }}
    >
      {children}
    </Wrapper>
  );
};

const Wrapper = styled(UnstyledButton)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    opacity: 0;
    background-color: ${p => p.circleColor};
  }
  &:focus:after,
  &:hover:after {
    opacity: 0.12;
  }
`;

export default Action;