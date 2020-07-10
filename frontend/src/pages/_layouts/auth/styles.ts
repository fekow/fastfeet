import styled, { keyframes } from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #7d40e7;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const rotate = keyframes`
from {
  transform: rotate(0deg);
}
to{
  transform: rotate(360deg);
}
`;
export const Content = styled.div`
  width: 100%;
  max-width: 360px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0px 0px 10px #00000033;
  text-align: center;
  padding: 60px 30px;
  form {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    label {
      text-align: left;
      font-weight: bold;
      color: #444444;
      font-size: 14px;
    }
    input {
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-shadow: 0 0 5px 0px rgba(0, 0, 0, 0.1);
      height: 44px;
      padding: 0 15px;
      color: #000;
      margin: 10px 0 10px;
      &::placeholder {
        color: #999;
      }
    }
    span {
      margin-bottom: 8px;
    }
    button {
      border: 0;
      border-radius: 8px;
      height: 44px;
      margin-top: 5px;
      background: #7d40e7;
      font-weight: bold;
      color: #fff;
      font-size: 16px;
      transition: background 0.2s ease-in-out;
      &:hover {
        background: ${darken(0.05, '#7D40E7')};
      }
      &[disabled] {
        cursor: not-allowed;
        opacity: 0.6;
      }
      svg {
        animation: ${rotate} 1s linear infinite;
      }
    }
    a {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;
      &:hover {
        opacity: 1;
      }
    }
  }
`;
