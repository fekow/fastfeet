import styled from 'styled-components';

export const Container = styled.div`
  border-bottom: 1px solid #eee;
  background: #fff;
  display: flex;
  flex-direction: row;
  padding: 19px 30px;
  justify-content: space-between;
  nav {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      margin-right: 10px;
      padding-right: 10px;
      border-right: 1px solid #eee;
      height: 26px;
    }
    a {
      text-decoration: none;
      color: #999;
      font-weight: bold;
      font-size: 15px;
      & + a {
        margin-left: 10px;
      }
    }
  }
  aside {
    display: flex;
    flex-direction: column;
    strong {
      color: #666;
      font-size: 14px;
    }
    button {
      color: #de3b3b;
      font-size: 14px;
      border: 0;
      background: inherit;
    }
  }
`;
