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
  label {
    margin-bottom: 20px;
    display: block;
    color: #444;
    font-weight: bold;
    font-size: 14px;
  }
  .product {
    margin-top: 20px;
    display: flex;
    flex: 1;
    flex-direction: column;
    input {
      display: inline-block;
      border: 1px solid #dddddd;
      border-radius: 4px;
      background: #fff;
      padding: 10px;
      font-size: 16px;
      &::placeholder {
        color: #999;
      }
    }
  }
`;

export const Inputs = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  .first {
    margin-right: 35px;
  }
  > div {
    width: 100%;
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
  background: #0e0a14;
  opacity: 0.7;
  h1 {
    color: #fff;
    margin-top: 24px;
    font-size: 32px;
  }
  svg {
    animation: ${rotate} 1.5s normal;
  }
`;
