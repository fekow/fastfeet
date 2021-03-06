import styled from 'styled-components';

export const ModalContainer = styled.div`
  width: 450px;
  padding: 15px;
  background: #fff;
  strong {
    font-size: 14px;
    color: #444;
  }
  div {
    border-bottom: 1px solid #eee;
    margin-bottom: 14px;
    padding-bottom: 10px;
    p {
      line-height: 1.5;
      font-size: 16px;
      color: #666;
    }
  }
  main {
    display: flex;
    img {
      width: 250px;
      margin: 15px auto 0;
    }
  }
`;

export const Container = styled.div`
  position: relative;
  button {
    border: 0;
    background: none;
  }
`;
export const ActionList = styled.div`
  position: absolute;
  width: 130px;
  right: -53px;
  top: calc(100% + 5px);
  background: #fff;
  border-radius: 4px;
  z-index: 2;

  box-shadow: 0px 0px 6px #00000026;
  padding: 15px 5px;
  text-align: center;
  display: ${(props: { visible: boolean }) =>
    props.visible ? 'inherit' : 'none'};
  a,
  button {
    svg {
      margin-right: 8px;
    }
    text-align: center;
    background: none;
    border: 0;
    display: flex;
    margin-bottom: 5px;
    font-size: 14px;
    text-decoration: none;
    color: #666;
  }
  /* triangulinho */
  &::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    left: calc(50% - 5px);
    top: -10px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 10px solid #eee;
  }
`;
