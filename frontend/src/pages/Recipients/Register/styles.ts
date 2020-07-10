import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-content: center;
  margin: 34px auto;
  form {
    header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 20px;
      div {
        h1 {
          color: #444;
          font-size: 24px;
          text-align: left;
        }
      }
      aside {
        display: flex;
        flex-direction: row;
        button {
          border: 0;
          font-size: 14px;
          background: #7d40e7;
          color: #fff;
          display: flex;
          align-items: center;
          border-radius: 4px;
          padding: 9px 15px;
          margin-left: 20px;
          font-weight: bold;
        }
        a {
          border-radius: 4px;
          font-size: 14px;
          border: 0;
          display: flex;
          padding: 9px 15px;
          align-items: center;
          background: #ccc;
          color: #fff;
          font-weight: bold;
        }
      }
    }
  }
`;

export const Wrapper = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 4px;
  width: 100%;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  label {
    margin-bottom: 20px;
    display: block;
    color: #444;
    font-weight: bold;
    font-size: 14px;
  }
  input {
    display: inline-block;
    border: 1px solid #dddddd;
    margin-bottom: 20px;
    border-radius: 4px;
    background: #fff;
    padding: 10px;
    font-size: 16px;
    &::placeholder {
      color: #999;
    }
  }
  input[readonly] {
    opacity: 0.6;
  }
  span {
    margin: -15px 0 10px;
  }
  button {
    border: 0;
    font-size: 14px;
    background: #7d40e7;
    color: #fff;
    border-radius: 4px;
    padding: 9px 15px;
    font-weight: bold;
  }
`;

export const InputRow = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  div {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .first {
    flex: 2;
  }
  div + div {
    margin-left: 10px;
  }
  label {
    display: block;
  }
  input {
    display: flex;
  }
`;

const rotate = keyframes`
from {
  transform: rotate(0deg);
}
to{
  transform: rotate(360deg);
}
`;

export const Finished = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.3);
  h1 {
    color: #fff;
    margin-top: 24px;
    font-size: 32px;
  }
  svg {
    animation: ${rotate} 1.5s normal;
  }
`;
