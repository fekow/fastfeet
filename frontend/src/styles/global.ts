import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export default createGlobalStyle`
  * {
    margin:0;
    padding:0;
    outline: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }
  *:focus {
    outline: 0;
  }
  html, body, #root {
    height: 100%;
  }
  body {
    -webkit-font-smoothing: antialiased;
  }
  border-style, input, button {
    font: 14px 'Roboto', sans-serif;
  }
  a {
    text-decoration: none;
    font: 10px 'Roboto', sans-serif;
  }
  ul {
    list-style: none;
  }
  button {
    cursor: pointer;
  }
`;
