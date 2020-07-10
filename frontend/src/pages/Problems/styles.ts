import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-content: center;
  margin: 34px auto;
  header {
    h1 {
      color: #444;
      font-size: 24px;
      text-align: left;
      margin-bottom: 34px;
    }
    margin-bottom: 20px;
    div {
      background: #fff;
      border-radius: 4px;
      padding: 4px;
      width: 250px;
      border: 1px solid #ddd;
      padding-left: 5px;
      height: 38px;
      display: flex;
      align-items: center;
      input {
        padding-left: 5px;
        border: 0;
        width: 230px;
      }
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
