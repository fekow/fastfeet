import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-content: center;
  margin: 34px auto;
  h1 {
    color: #444;
    font-size: 24px;
    text-align: left;
    margin-bottom: 34px;
  }
  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
    div {
      display: flex;
      align-items: center;
      background: #fff;
      border-radius: 4px;
      padding: 4px;
      border: 1px solid #ddd;
      padding-left: 5px;
      input {
        padding-left: 5px;
        border: 0;
      }
    }
    a {
      border: 0;
      font-size: 14px;
      font-weight: bold;
      background: #7d40e7;
      color: #fff;
      display: flex;
      align-items: center;
      padding: 9px 15px;
      border-radius: 4px;
    }
  }

  table {
    thead {
      th {
        color: #444;
      }
    }
    th,
    td {
      strong {
        > div {
          margin-right: 8px;
        }
        font-weight: lighter;
        display: flex;
        align-items: center;
        img {
          width: 36px;
          border-radius: 16px;
          margin-right: 8px;
        }
      }
      text-align: left;
      padding: 18px 25px;
      font-size: 16px;
    }
    border-spacing: 0px 10px;
    tbody {
      tr {
        background: #fff;
        td {
          color: #666;
        }
      }
      /* BORDER RADIUS EACH ROW */
      tr > td:first-child {
        border-radius: 10px 0 0 10px;
        -moz-border-radius: 10px 0 0 10px;
      }
      tr > td:last-child {
        border-radius: 0 10px 10px 0;
        -moz-border-radius: 0 10px 10px 0;
        text-align: right;
      }
    }

    /* FINISH */
    thead > tr > th:last-child {
      text-align: right;
    }
  }
`;
/* arrows pagination */
export const Pagination = styled.footer`
  display: flex;
  margin-top: 10px;
  flex-direction: row;
  justify-content: space-between;
  small {
    color: #666;
    font-weight: bold;
  }
  button {
    background: none;
    border: 0;
    &[disabled] {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }
`;
// Status Pointer
export const Status = styled.td`
  > div {
    position: relative;
    background: ${(props: { status: string }) => {
      switch (props.status) {
        case 'Pendente':
          return '#F0F0DF';
        case 'Entregue':
          return '#DFF0DF';
        case 'Retirada':
          return '#BAD2FF';
        case 'Cancelada':
          return '#FAB0B0';
      }
    }};
    border-radius: 12px;
    display: inline-block;
    padding: 3px 10px 3px 25px;
    strong {
      color: ${(props: { status: string }) => {
        switch (props.status) {
          case 'Pendente':
            return '#C1BC35';
          case 'Entregue':
            return '#2CA42B';
          case 'Retirada':
            return '#4D85EE';
          case 'Cancelada':
            return '#DE3B3B';
        }
      }};
      font-weight: bold;
    }
    div {
      position: absolute;
      left: 6px;
      top: 8px;
      height: 10px;
      width: 10px;
      border-radius: 5px;
      background: ${(props: { status: string }) => {
        switch (props.status) {
          case 'Pendente':
            return '#C1BC35';
          case 'Entregue':
            return '#2CA42B';
          case 'Retirada':
            return '#4D85EE';
          case 'Cancelada':
            return '#DE3B3B';
        }
      }};
    }
  }
`;
