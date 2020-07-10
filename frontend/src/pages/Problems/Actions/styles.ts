import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  button {
    border: 0;
    background: #fff;
  }
`;

export const ModalContainer = styled.div`
  width: 450px;
  padding: 15px;
  background: #fff;
  strong {
    font-size: 14px;
    color: #444;
  }
  p {
    line-height: 1;
    font-size: 16px;
    color: #666;
  }
  div {
    border-bottom: 1px solid #eee;
    margin-bottom: 14px;
    padding-bottom: 10px;
  }
`;

export const ActionList = styled.div`
  position: absolute;
  width: 180px;
  right: -78px;
  top: calc(100% + 5px);
  background: #fff;
  border-radius: 4px;
  z-index: 2;
  flex-direction: column;
  box-shadow: 0px 0px 6px #00000026;
  padding: 15px 5px;
  display: ${(props: { visible: boolean }) =>
    props.visible ? 'inherit' : 'none'};
  div {
    display: flex;
    flex-direction: row;
    button {
      background: none;
      text-align: left;
      border: 0;
      margin-bottom: 5px;
      font-size: 14px;
      color: #666;
      svg {
        margin-right: 8px;
      }
      /* &:hover {
        box-shadow: 0px 0px 6px #00000026;
      } */
    }
  }
  div + div {
    border-top: 1px solid #eee;
    padding-top: 5px;
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
