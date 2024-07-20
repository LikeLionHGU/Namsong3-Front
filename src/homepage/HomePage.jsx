import React from "react";
import Header from "../common/Header";
import styled from "styled-components";
import Goals from "./component/Goals";

function Hompage() {
  return (
    <div>
      <Header></Header>
      <Goals />
    </div>
  );
}

export default Hompage;
