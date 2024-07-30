import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <>
    <App />
    <link
      rel="stylesheet"
      href="https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css"
    />
  </>
  // </React.StrictMode>
);
