import React from "react";
import { render } from "react-dom";

import App from './components/App';

const content = (
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);

const mountDomElement = document.getElementById('root');

render(content, mountDomElement);
